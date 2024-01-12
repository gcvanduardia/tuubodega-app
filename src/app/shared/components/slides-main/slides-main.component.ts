import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { GlobalService } from "../../services/global/global.service";
import { PreloadImageDirective } from "../../utils/preload-image-directive";
import { fromEvent, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-slides-main',
  templateUrl: './slides-main.component.html',
  styleUrls: ['./slides-main.component.scss'],
  standalone: true,
  imports: [CommonModule, PreloadImageDirective]
})
export class SlidesMainComponent implements OnInit, AfterViewInit, OnDestroy {

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
    console.log('swiperParams: ',this.swiperParams);
  }

  initSwiper(): void {
    if(this.glb.isMobile){
      this.timerSubscription = timer(100).subscribe(() => {
        console.log("initSwiper mobile from slides-main.component.ts")
        this.swiper = new Swiper('.swiper', this.swiperParams);
        this.timerSubscription?.unsubscribe();
      });
    } else {
      this.loadEventSubscription = fromEvent(window, 'load').subscribe(() => {
        console.log("initSwiper web from slides-main.component.ts")
        this.swiper = new Swiper('.swiper', this.swiperParams);
        this.loadEventSubscription?.unsubscribe();
      });
    }
  }

}
