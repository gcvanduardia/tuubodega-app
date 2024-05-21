import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Subscription, timer } from 'rxjs';
import { GlobalService } from "../../../../shared/services/global/global.service";
import { PreloadImageDirective } from "../../../../shared/utils/preload-image-directive";

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
  standalone: true,
  imports: [CommonModule, PreloadImageDirective]
})
export class SlidesComponent  implements OnInit {

  @Input() slides: any[] = [];
  @Input() params?: any = {};

  swiper?: Swiper;
  swiperParamsDef: any = {
    modules: [Navigation, Pagination, Autoplay], 
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index: number, className: string) => {
        return '<span class="' + className + '">' + "</span>";
      }
    },
    navigation: {
      enabled: true,
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }, 
    centeredSlides: true,
    autoplay: {
      delay:3000,
      disableOnInteraction: false,
    }, 
    speed: 400,
    loop: true,
  }
  swiperParams:any = {};
  loadEventSubscription?: Subscription;
  timerSubscription?: Subscription;

  constructor(
    public glb: GlobalService
  ) { }

  ngOnInit() {
    this.initParams();
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  ngOnDestroy(): void {
    if (this.loadEventSubscription) {
      this.loadEventSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  initParams(): void {
    this.swiperParams = {
      ...this.swiperParamsDef,
      ...this.params,
      autoplay: {
        ...this.swiperParamsDef.autoplay,
        ...this.params.autoplay
      },
      navigation: {
        ...this.swiperParamsDef.navigation,
        ...this.params.navigation
      }
    };
    console.log('swiperParams from product-description: ',this.swiperParams);
  }

  initSwiper(): void {
    if(this.slides.length == 1){ this.swiperParams.loop = false; }
    if(this.glb.isMobile){
      this.swiperParams.navigation.enabled = false;
    }
    this.timerSubscription = timer(100).subscribe(() => {
      console.log("initSwiper from product-description")
      this.swiper = new Swiper('.swiper', this.swiperParams);
      this.timerSubscription?.unsubscribe();
    });
  }

}
