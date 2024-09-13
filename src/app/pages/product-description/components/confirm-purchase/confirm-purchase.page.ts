import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderMainComponent } from "../../../../shared/layouts/header-main/header-main.component";
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput, IonImg } from '@ionic/angular/standalone';
import { ProductService } from '../../../../shared/services/product-service/product.service';
import { ArticlesService } from "../../../../shared/services/articles/articles.service";
import { GlobalService } from "../../../../shared/services/global/global.service";
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-purchase',
  templateUrl: './confirm-purchase.page.html',
  styleUrls: ['./confirm-purchase.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, HeaderMainComponent, IonCard, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput, IonImg]
})
export class ConfirmPurchasePage implements OnInit {
  productInfo: any;
  idCotizacion: number | null = null;
  idOrden: number | null = null;
  isCart: boolean = false;
  productos: any[] = [];

  constructor(private router: Router, 
  private productService: ProductService,
  private route: ActivatedRoute,
  public glb: GlobalService,
  private api: ArticlesService,
  private cartService: CartService
) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idCotizacion = params['idCotizacion'];
      
    });

    this.route.params.subscribe(params => {
      if (params['idCotizacion']) {
        this.idCotizacion = +params['idCotizacion'];
        this.isCart = false;
        console.log('idCotizacion', this.idCotizacion);
        this.initCotizacion();
      }else if (params['idOrden']) {
        this.idOrden = +params['idOrden'];
        this.isCart = true;
        console.log('idOrden', this.idOrden);
        this.initCart();
      }
      console.log('isCart', this.isCart);
    });
  }

  async loadProductInfo() {
    if (this.idCotizacion !== null) {
      try {
        const response = await this.productService.getProductInfo(this.idCotizacion);
        console.log('Respuesta de la API:', response);
        console.log('price *********', response.PrecioUnit);
        this.productInfo = response;
      } catch (error) {
        console.error('Error al obtener la información del producto:', error);
      }
    } else {
      console.error('idCotizacion es null');
    }
  }

  async loadOrdenInfo() {
    if (this.idOrden !== null) {
      try {
        const response = await this.cartService.getCotizacion(this.idOrden);
        console.log('Respuesta de la API (Orden):', response);
        this.productInfo = response;
      } catch (error) {
        console.error('Error al obtener la información de la orden:', error);
      }
  
      try {
        const productosResponse = await this.cartService.getProductosOrden(this.idOrden);
        console.log('Respuesta de la API (Productos):', productosResponse);
        if (Array.isArray(productosResponse)) {
          this.productos = productosResponse;
          console.log('Productos:', this.productos);
  
          // Llamar a `fetchProductDetails` aquí
          await this.fetchProductDetails();
        } else {
          console.error('La respuesta de productos no es un array:', productosResponse);
        }
      } catch (error) {
        console.error('Error al obtener la información de los productos:', error);
      }
    } else {
      console.error('idOrden es null');
    }
  }

  formatPrice(price: number | null | undefined): string {
    if (price == null) {
        return '$0.00';
    }
    return `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  calculateTotal(): string {
    if (this.productInfo) {
      const total = this.productInfo.ValorUnt * this.productInfo.Stock;
      return this.formatPrice(total);
    }
    return this.formatPrice(0);
  }

  async initCotizacion(){
    // Lógica para inicializar la cotización
    this.loadProductInfo();
    // this.productService.compareIdUsers(this.idCotizacion);
  }

  async initCart(){
    // Lógica para inicializar el cart
    console.log('Inicializando cart con idOrden:', this.idOrden);
    if (this.idOrden !== null) {
      this.cartService.getCotizacion(this.idOrden);
      this.loadOrdenInfo();
    }
    else{
      console.error('idOrden is null');
    }
    // this.productService.compareIdUsers(this.idOrden);
  }

  async buyNow() {
    try {
      if (this.glb.idUser === 0) {
        this.router.navigate(['/login'], { queryParams: { navigation: this.router.url } });
        return;
      }
      const purchaseData = await this.api.getDataBuyWompi({ id: this.productInfo.Id, cantidad: this.productInfo.Stock});
      const publicKey = purchaseData.publicKey ?? '';
      const currency = purchaseData.currency ?? '';
      const amountInCents = purchaseData.amountInCents ?? '';
      const reference = purchaseData.reference ?? '';
      const signature = purchaseData.integritySignature ?? '';
      const redirectUrl = encodeURIComponent(window.location.href);
      const urlWompi = `https://checkout.wompi.co/p/?public-key=${publicKey}&currency=${currency}&amount-in-cents=${amountInCents}&reference=${reference}&signature%3Aintegrity=${signature}&redirect-url=${redirectUrl}`;
      window.location.href = urlWompi;
    } catch (error) {
      console.error('Hubo un error al realizar la compra:', error);
    }
  }

  async buyNowCart() {
    console.log('Comprando carrito');
      try {
        const purchaseData = await this.cartService.buyNow();
        const publicKey = purchaseData.publicKey ?? '';
        const currency = purchaseData.currency ?? '';
        const amountInCents = purchaseData.amountInCents ?? '';
        const reference = purchaseData.reference ?? '';
        const signature = purchaseData.integritySignature ?? '';
        const redirectUrl = new URL(window.location.href).origin;
        const urlWompi = `https://checkout.wompi.co/p/?public-key=${publicKey}&currency=${currency}&amount-in-cents=${amountInCents}&reference=${reference}&signature%3Aintegrity=${signature}&redirect-url=${redirectUrl}`;
        window.location.href = urlWompi;
      } catch (error) {
        console.error('Hubo un error al realizar la compra:', error);
      }
  }

  async fetchProductDetails() {
    for (const producto of this.productos) {
      try {
        const articleDetails = await this.api.getArticle(producto.IdArticulo);
        producto.details = articleDetails;
        console.log('Detalles del producto:', articleDetails);
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
      }
    }
  }
}