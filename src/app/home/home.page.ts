import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { HeaderMainComponent } from "../shared/layouts/header-main/header-main.component";
import { ProductCardComponent } from "../shared/components/product-card/product-card.component";
import { GlobalService } from "../shared/services/global/global.service";
import { InitService } from "../services/init/init.service";
import { SlidesMainComponent } from "../shared/components/slides-main/slides-main.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, HeaderMainComponent, ProductCardComponent, IonGrid, IonRow, IonCol, SlidesMainComponent, RouterModule],
})
export class HomePage implements OnInit {

  lastViewProducts: any[] = [];
  slides: any;
  
  constructor(
    private glb: GlobalService,
    private init: InitService
  ) {}

  async ngOnInit() {
    await this.getInitData();
  }

  async getInitData() {
    this.init.getInitProducts()
      .then((data: any) => {
        this.lastViewProducts = data;
        console.log('getInitProducts home: ', this.lastViewProducts);
      })
      .catch((error: any) => {
        console.log('getInitProducts home error: ', error);
      });
    this.slides = this.init.getInitSlides();

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

}
