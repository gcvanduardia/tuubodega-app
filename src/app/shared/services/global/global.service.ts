import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public isMobile: boolean = this.plt.is('mobile');
  public searchArticles: string = '';
  public pageArticles: number = 1;
  public pageArticlesLimit: number = 1;
  public articles: any[] = [];
  public quatntityArticles: number = 0;
  public orderArticles: string = 'masRelevante';

  constructor(
    public plt: Platform
  ) { 
    console.log('from Global Service, isMobile: ', this.isMobile);
  }
}
