import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderMainComponent } from "../../../../shared/layouts/header-main/header-main.component";
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput } from '@ionic/angular/standalone';
import { ProductService } from '../../../../shared/services/product-service/product.service';
import { GlobalService } from "../../../../shared/services/global/global.service";
import { CartService } from 'src/app/shared/services/cart/cart.service';

@Component({
  selector: 'app-delivery-method',
  templateUrl: './delivery-method.page.html',
  styleUrls: ['./delivery-method.page.scss'],
  standalone: true,
  imports: [IonContent, HeaderMainComponent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput]
})
export class DeliveryMethodPage {
  idCotizacion: number | null = null;
  idOrden: number | null = null;
  isCart: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    public glb: GlobalService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['idCotizacion']) {
        this.idCotizacion = +params['idCotizacion'];
        this.isCart = false;
        console.log('idCotizacion', this.idCotizacion);
        this.initCotizacion();
      } else if (params['idOrden']) {
        this.idOrden = +params['idOrden'];
        this.isCart = true;
        console.log('idOrden', this.idOrden);
        this.initCart();
      }
    });
  }

  selectMethod(method: string) {
    if (this.isCart && this.idOrden !== null) {
      // Lógica para cart
      this.cartService.setDeliveryMethod(method, this.idOrden);
      console.log('Método de entrega seleccionado para cart', method);
      this.router.navigate([`/payment-method/cart/${this.idOrden}`]);
    } else if (!this.isCart && this.idCotizacion !== null) {
      // Lógica para cotización
      this.productService.setDeliveryMethod(method, this.idCotizacion);
      this.router.navigate([`/payment-method/${this.idCotizacion}`]);
    } else {
      console.error('idCotizacion or idOrden is null');
    }
  }

  async initCotizacion(){
    // Lógica para inicializar la cotización
    // this.productService.compareIdUsers(this.idCotizacion);
  }

  async initCart(){
    // Lógica para inicializar el cart
    console.log('Inicializando cart con idOrden:', this.idOrden);
    if (this.idOrden !== null) {
      this.cartService.getCotizacion(this.idOrden);
    }
    else{
      console.error('idOrden is null');
    }
    // this.productService.compareIdUsers(this.idOrden);
  }
}
