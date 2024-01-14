import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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

  headers = new HttpHeaders().set('x-api-key', 'tuubodegaAuth');

  constructor(
    private http: HttpClient
  ) { }


  async searchArticles(search: string, page: number): Promise<any> {
    try {
      const headers = this.headers;
      let url = `${environment.api.url}/articulos/search?search=${search}&pageNumber=${page}`;
      if(search === ''){
        url = `${environment.api.url}/articulos/search?pageNumber=${page}`
      }
      const observable = this.http.get(url, { headers });
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('Hubo un error al obtener los productos iniciales:', error);
      throw error;
    }
  }

  getInitSlides() {
    return this.slides;
  }

}
