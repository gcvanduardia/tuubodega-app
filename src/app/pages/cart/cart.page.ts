import { Component, OnInit } from '@angular/core';
import { IonContent, IonGrid, IonIcon, IonText, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle, IonImg, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { HeaderMainComponent } from "../../shared/layouts/header-main/header-main.component";
import { addIcons } from 'ionicons';
import { trashOutline } from "ionicons/icons";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService, ICartArticle } from 'src/app/shared/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [ FormsModule, CommonModule, HeaderMainComponent, IonContent, IonGrid, IonIcon, IonText, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle, IonImg, IonItem, IonInput, IonButton ]
})
export class CartPage  implements OnInit {

  article = {
    Cantidad: 5
  }
  products: ICartArticle[] = [];
  summary: number = 0;
  amountProduct: number = 1;

  constructor(
    private api: CartService
  ) {
    addIcons({ trashOutline })
  }

  async ngOnInit() {
    await this.getCartList();
    await this.getSummaryCart();
  }

  async buyNow(){
    try {
      const purchaseData = await this.api.buyNow();
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

  goHome() {
    const redirectUrl = new URL(window.location.href).origin;
    window.location.href = redirectUrl;
  }

  async getCartList() {
    this.products = await this.api.getCartList();
  }

  async getSummaryCart() {
    this.summary = await this.api.getSummaryCart();
  }

  async handleChangeAmount(product: ICartArticle) {
    if(product.Cantidad > product.CantidadMaxima){
      product.Cantidad = product.CantidadMaxima;
    }
    if(product.Cantidad < 1){
      product.Cantidad = 1;
    }
    await this.api.updateAmountArticle(product.IdArticulo, product.Cantidad);
    this.getSummaryCart();
  };

  async handleDeleteProduct(product: ICartArticle) {
    try {
      await this.api.deleteArticle(product.IdArticulo)
      this.getCartList();
      this.api.getAmountCart();
    } catch (error) {}
  }

  async clearCart() {
    await this.api.clearCart();
    this.api.getAmountCart();
    this.goHome();
  }
}
