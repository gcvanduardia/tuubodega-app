import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonInfiniteScroll, IonInfiniteScrollContent, IonText } from '@ionic/angular/standalone';
import { HeaderMainComponent } from "../shared/layouts/header-main/header-main.component";
import { ProductCardComponent } from "../shared/components/product-card/product-card.component";
import { GlobalService } from "../shared/services/global/global.service";
import { ApiService } from "../shared/services/api/api.service";
import { SlidesMainComponent } from "../shared/components/slides-main/slides-main.component";
import { RouterModule } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, HeaderMainComponent, ProductCardComponent, IonGrid, IonRow, IonCol, SlidesMainComponent, RouterModule, IonInfiniteScroll, IonInfiniteScrollContent, IonText],
})
export class HomePage implements OnInit {

  slides: any[] = [];
  
  constructor(
    public glb: GlobalService,
    private api: ApiService,
  ) {}

  async ngOnInit() {
    await this.getInitData();
    const products = await this.api.searchArticles(this.glb.searchArticles, this.glb.pageArticles);
    this.glb.articles.push(...products[1]);
  }

  async getInitData() {
    this.slides = this.api.getInitSlides();
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
    this.glb.pageArticles++;
    console.log('this.glb.pageArticles:', this.glb.pageArticles);
    const products = await this.api.searchArticles(this.glb.searchArticles, this.glb.pageArticles);
    this.glb.articles.push(...products[1]);
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

}
