import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonInfiniteScroll, IonInfiniteScrollContent, IonText, IonSpinner } from '@ionic/angular/standalone';
import { HeaderMainComponent } from "../shared/layouts/header-main/header-main.component";
import { ProductCardComponent } from "../shared/components/product-card/product-card.component";
import { GlobalService } from "../shared/services/global/global.service";
import { ApiService } from "../shared/services/api/api.service";
import { SlidesMainComponent } from "../shared/components/slides-main/slides-main.component";
import { RouterModule } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { HeaderSerachComponent } from "./components/header-serach/header-serach.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, HeaderMainComponent, ProductCardComponent, IonGrid, IonRow, IonCol, SlidesMainComponent, RouterModule, IonInfiniteScroll, IonInfiniteScrollContent, IonText, IonSpinner, HeaderSerachComponent],
})
export class HomePage implements OnInit {

  slides: any[] = [];
  initArticlesSipnner: boolean = false;
  
  constructor(
    public glb: GlobalService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.getInitSearch();
  }

  getInitSearch() {
    this.route.params.subscribe(params => {
      if(!params['search']){
        this.glb.searchArticles = '';
        this.getInitData();
      }
    });
  }

  async getInitData() {
    this.getInitArticles();
    this.slides = this.api.getInitSlides();
  }

  async getInitArticles() {
    this.initArticlesSipnner = true;
    const products = await this.api.searchArticles();
    this.initArticlesSipnner = false;
    this.glb.articles = [];
    this.glb.articles.push(...products[0]);
    this.glb.quatntityArticles = products[1][0].Resultados;
    this.glb.pageArticlesLimit = Math.ceil(this.glb.quatntityArticles / products[1][0].PageZise);
    console.log('init articles this.glb.articles', this.glb.articles);
    console.log('this.glb.quatntityArticles', this.glb.quatntityArticles)
    console.log('this.glb.pageArticlesLimit:', this.glb.pageArticlesLimit);
  }

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
    const products = await this.api.searchArticles(this.glb.searchArticles, this.glb.pageArticles, this.glb.orderArticles);
    console.log('products searched:', products);
    this.glb.articles.push(...products[0]);
    infiteScroll.target.complete();
  }

}
