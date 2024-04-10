import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";
import { Router } from '@angular/router';

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
  public categories: any[] = [];
  public categoriesSelected: any[] = [];
  public categoriesSelectedString: string = '';
  public filterInProcess: boolean = false;
  public searchInProcess: boolean = false;
  public preSearchArticles: any[] = [];

  constructor(
    public plt: Platform,
    private router: Router
  ) { 
    console.log('from Global Service, isMobile: ', this.isMobile);
  }

  searchRouter(){
    this.router.navigate(['/'], { queryParams: { search: this.searchArticles, categories: this.categoriesSelectedString, order: this.orderArticles } })
  }
}
