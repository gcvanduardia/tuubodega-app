import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput } from '@ionic/angular/standalone';
import { HeaderMainComponent } from "../../shared/layouts/header-main/header-main.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from "../../shared/services/articles/articles.service";
import { SlidesComponent } from "./components/slides/slides.component";
import { GlobalService } from "../../shared/services/global/global.service";
import { FormsModule } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart/cart.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.page.html',
  styleUrls: ['./product-description.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, HeaderMainComponent, IonGrid, IonRow, IonCol, IonText, IonSpinner, SlidesComponent, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput, FormsModule]
})
export class ProductDescriptionPage implements OnInit {

  id: number = 0;
  article: any;
  loadingArticle: boolean = false
  amountProduct: number = 1;
  paymentMethodSelected: string = "wompi";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ArticlesService,
    private apiCart: CartService,
    public glb: GlobalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id']){
        this.id = params['id'];
        console.log("id producto: ",this.id);
        this.getArticle();
      }
    });
  }

  async buyNow(){
    try {
      if(this.glb.idUser === 0){
        this.router.navigate([`/login`], { queryParams: { navigation: this.router.url } });
        return;
      };
      const purchaseData = await this.api.getDataBuyWompi({id: this.article.Id, cantidad: this.amountProduct});
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

  handleChangeAmount() {
    if(this.amountProduct >= this.article.Cantidad){
      this.amountProduct = this.article.Cantidad;
    }
    if(this.amountProduct <= 0){
      this.amountProduct = 1;
    }
  }

  async addToCart(){
    if(this.glb.idUser === 0){
      this.router.navigate([`/login`], { queryParams: { navigation: this.router.url } });
      return;
    };
    await this.apiCart.addArticle(this.id, this.amountProduct);
  }

  async getArticle() {
    this.loadingArticle = true;
    const articleRes = await this.api.getArticle(this.id);
    this.loadingArticle = false;
    if(articleRes){
      this.article = articleRes;
      this.adaptArticle();
      console.log("article: ",this.article);
    }
  }

  adaptArticle(){
    this.article.ImagenesArray = this.article.Imagenes.split(',');
    this.article.ImagenesArray = this.article.ImagenesArray.filter((image:any) => image !== "");
  }

}
