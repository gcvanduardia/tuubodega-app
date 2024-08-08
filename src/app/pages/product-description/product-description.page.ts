import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput } from '@ionic/angular/standalone';
import { HeaderMainComponent } from "../../shared/layouts/header-main/header-main.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from "../../shared/services/articles/articles.service";
import { SlidesComponent } from "./components/slides/slides.component";
import { GlobalService } from "../../shared/services/global/global.service";
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../shared/services/product-service/product.service';

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
    public glb: GlobalService,
    private productService: ProductService
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

  startPurchase() {
    this.router.navigate([`/delivery-method/${this.article.Cod}/${this.article.Id}/${this.glb.user.IdUser}`]);
    this.productService.setProductInfo(this.article);
  }

  

  handleChangeAmount() {
    if(this.amountProduct >= this.article.Cantidad){
      this.amountProduct = this.article.Cantidad;
    }
  }

  async getArticle() {
    this.loadingArticle = true;
    const articleRes = await this.api.getArticle(this.id);
    this.loadingArticle = false;
    if(articleRes){
      this.article = articleRes;
      this.adaptArticle();
    }
  }

  adaptArticle(){
    this.article.ImagenesArray = this.article.Imagenes.split(',');
    this.article.ImagenesArray = this.article.ImagenesArray.filter((image:any) => image !== "");
  }

}
