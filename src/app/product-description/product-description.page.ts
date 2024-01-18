import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton } from '@ionic/angular/standalone';
import { HeaderMainComponent } from "../shared/layouts/header-main/header-main.component";
import { ActivatedRoute } from '@angular/router';
import { ApiService } from "../shared/services/api/api.service";
import { SlidesComponent } from "./components/slides/slides.component";
import { GlobalService } from "../shared/services/global/global.service";

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.page.html',
  styleUrls: ['./product-description.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, HeaderMainComponent, IonGrid, IonRow, IonCol, IonText, IonSpinner, SlidesComponent, IonButton]
})
export class ProductDescriptionPage implements OnInit {

  id: number = 0;
  article: any;
  loadingArticle: boolean = false

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
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
