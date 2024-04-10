import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from "../../../../environments/environment.prod";
import { GlobalService } from "../global/global.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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

  headers = new HttpHeaders().set('x-api-key', 'tuubodegaAuth');

  constructor(
    private http: HttpClient,
    private glb: GlobalService,
  ) { }

  async searchArticles(): Promise<any> {
    try {
      const headers = this.headers;
      let url = `${environment.api.url}/articulos/search?search=${this.glb.searchArticles}&pageNumber=${this.glb.pageArticles}&order=${this.glb.orderArticles}&categories=${this.glb.categoriesSelectedString}`;
      if(this.glb.searchArticles === ''){
        url = `${environment.api.url}/articulos/search?pageNumber=${this.glb.pageArticles}&order=${this.glb.orderArticles}&categories=${this.glb.categoriesSelectedString}`;
      }
      console.log('url:', url);
      const observable = this.http.get(url, { headers });
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('Hubo un error al obtener los productos iniciales:', error);
      throw error;
    }
  }
  
  async preSearchArticles(search: string): Promise<any> {
    try {
      const headers = this.headers;
      let url = `${environment.api.url}/articulos/presearch?search=${search}&pageNumber=1&order=masRelevante`;
      console.log('url:', url);
      const observable = this.http.get(url, { headers });
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('Hubo un error al obtener los productos iniciales:', error);
      throw error;
    }
  }



  async getArticle(id: number): Promise<any> {
    try {
      const headers = this.headers;
      const observable = this.http.get(`${environment.api.url}/articulos/articulo?id=${id}`, { headers });
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('Hubo un error al obtener el producto:', error);
      throw error;
    }
  }

  getInitSlides() {
    return this.slides;
  }

}
