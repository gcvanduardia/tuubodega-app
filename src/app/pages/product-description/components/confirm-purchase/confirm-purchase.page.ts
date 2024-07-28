import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMainComponent } from "../../../../shared/layouts/header-main/header-main.component";
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput, IonImg } from '@ionic/angular/standalone';
import { ProductService } from '../../../../shared/services/product-service/product.service';
import { ArticlesService } from "../../../../shared/services/articles/articles.service";
import { GlobalService } from "../../../../shared/services/global/global.service";

@Component({
  selector: 'app-confirm-purchase',
  templateUrl: './confirm-purchase.page.html',
  styleUrls: ['./confirm-purchase.page.scss'],
  standalone: true,
  imports: [IonContent, HeaderMainComponent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput, IonImg]
})
export class ConfirmPurchasePage implements OnInit {
  productInfo: any;

  constructor(private router: Router, 
  private productService: ProductService,
  public glb: GlobalService,
  private api: ArticlesService
) {}

  ngOnInit() {
    this.productInfo = this.productService.getProductInfo();
  }

  completePurchase() {
    console.log("productInfo", this.productInfo);
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  calculateTotal(): string {
    if (this.productInfo) {
      const total = this.productInfo.PrecioUnit * this.productInfo.Cantidad;
      return this.formatPrice(total);
    }
    return this.formatPrice(0);
  }

  async buyNow() {
    try {
      if (this.glb.idUser === 0) {
        this.router.navigate(['/login'], { queryParams: { navigation: this.router.url } });
        return;
      }
      const purchaseData = await this.api.getDataBuyWompi({ id: this.productInfo.Id, cantidad: this.productInfo.Cantidad});
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
}