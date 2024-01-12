import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  slides: any[] = [
    {
      web: "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1700509148719-computacion-con-banco1.jpg",
      mobile: "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:low/1700455845558-mobile-con-banco2.jpg",
      isLoaded: false,
      alt: "image 1"
    },
    {
      web: "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1700509148719-computacion-con-banco1.jpg",
      mobile: "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:low/1700455845558-mobile-con-banco2.jpg",
      isLoaded: false,
      alt: "image 2"
    },
    {
      web: "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1700509148719-computacion-con-banco1.jpg",
      mobile: "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:low/1700455845558-mobile-con-banco2.jpg",
      isLoaded: false,
      alt: "image 3"
    },
    {
      web: "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1700509148719-computacion-con-banco1.jpg",
      mobile: "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:low/1700455845558-mobile-con-banco2.jpg",
      isLoaded: false,
      alt: "image 4"
    },
  ];

  url: string = "https://fakestoreapi.com/products/";

  constructor(
    private http: HttpClient
  ) { }


  async getInitProducts(): Promise<any> {
    const observable = this.http.get(`${this.url}`);
    return lastValueFrom(observable);
  }

  getInitSlides() {
    return this.slides;
  }

}
