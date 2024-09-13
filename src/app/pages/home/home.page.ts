import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonInfiniteScroll, IonInfiniteScrollContent, IonText, IonSpinner, IonCard } from '@ionic/angular/standalone';
import { HeaderMainComponent } from "../../shared/layouts/header-main/header-main.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { GlobalService } from "../../shared/services/global/global.service";
import { ArticlesService } from "../../shared/services/articles/articles.service";
import { SlidesMainComponent } from "../../shared/components/slides-main/slides-main.component";
import { RouterModule } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { HeaderSerachComponent } from "./components/header-serach/header-serach.component";
import { FiltrarComponent } from "./components/filtrar/filtrar.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCard, CommonModule, IonContent, HeaderMainComponent, ProductCardComponent, IonGrid, IonRow, IonCol, SlidesMainComponent, RouterModule, IonInfiniteScroll, IonInfiniteScrollContent, IonText, IonSpinner, HeaderSerachComponent, FiltrarComponent],
})
export class HomePage implements OnInit {

  initArticlesSipnner: boolean = false;
  denarioArticles: any[] = [];
  slides: any[] = [
    {
      web: "https://tuubodega.s3.amazonaws.com/banner-app/banner-test-web.webp",
      mobile: "https://tuubodega.s3.amazonaws.com/banner-app/banner-test-mobile.webp",
      isLoaded: false,
      alt: "image 1"
    },
    {
      web: "https://tuubodega.s3.amazonaws.com/banner-app/banner-test-web.webp",
      mobile: "https://tuubodega.s3.amazonaws.com/banner-app/banner-test-mobile.webp",
      isLoaded: false,
      alt: "image 2"
    },
    {
      web: "https://tuubodega.s3.amazonaws.com/banner-app/banner-test-web.webp",
      mobile: "https://tuubodega.s3.amazonaws.com/banner-app/banner-test-mobile.webp",
      isLoaded: false,
      alt: "image 3"
    },
    {
      web: "https://tuubodega.s3.amazonaws.com/banner-app/banner-test-web.webp",
      mobile: "https://tuubodega.s3.amazonaws.com/banner-app/banner-test-mobile.webp",
      isLoaded: false,
      alt: "image 4"
    },
  ];
  
  constructor(
    public glb: GlobalService,
    private api: ArticlesService,
  ) {}

  async ngOnInit() {
    this.denarioArticles = await this.api.denarioProducts();
    console.log('this.denarioArticles:', this.denarioArticles);
  }

  async getInitData() {}

  swiperParamsSelect() {
    let swiperParams: any = {};
    if(this.glb.isMobile){
      swiperParams = {
        navigation: { enabled: false },
      }
    }
    return swiperParams;
  }

  async onIonInfinite(ev: any) {
    const infiteScroll = (ev as InfiniteScrollCustomEvent);
    if(this.glb.pageArticles >= this.glb.pageArticlesLimit) {
      infiteScroll.target.complete();
      return;
    }
    this.glb.pageArticles++;
    console.log('this.glb.pageArticles:', this.glb.pageArticles);
    const products = await this.api.searchArticles();
    console.log('products searched:', products);
    this.glb.articles.push(...products[0]);
    infiteScroll.target.complete();
  }

}
