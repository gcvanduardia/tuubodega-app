import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonButton, IonIcon, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { search } from "ionicons/icons";
import { GlobalService } from "../../services/global/global.service";
import { ApiService } from "../../services/api/api.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [ IonInput, IonButton, IonIcon, IonItem, CommonModule, FormsModule, IonSpinner ],
})
export class SearchMainComponent  implements OnInit {

  searchArticles:string = '';
  searchInProcess: boolean = false;

  constructor(
    public glb: GlobalService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({ search });
  }

  ngOnInit() {
    this.getInitSearch();
  }

  getInitSearch() {
    this.route.queryParams.subscribe(params => {
      if(params['search']){
        this.glb.searchArticles = params['search'];
        this.searchArticles = params['search'];
        this.glb.pageArticles = 1;
        console.log("search: ",this.glb.searchArticles);
        this.search();
      }
    });
  }

  async search(){
    this.glb.searchArticles = this.searchArticles;
    this.glb.pageArticles = 1;
    this.searchInProcess = true;
    const products = await this.api.searchArticles(this.glb.searchArticles, this.glb.pageArticles, this.glb.orderArticles);
    console.log('products searched:', products);
    this.searchInProcess = false;
    this.glb.articles = [];
    this.glb.articles.push(...products[0]);
    this.glb.quatntityArticles = products[1][0].Resultados;
    this.glb.pageArticlesLimit = Math.ceil(this.glb.quatntityArticles / products[1][0].PageZise);
    console.log('this.glb.quatntityArticles', this.glb.quatntityArticles)
    console.log('this.glb.pageArticlesLimit:', this.glb.pageArticlesLimit);
  }

  searchRouter(){
    this.glb.searchArticles = '';
    this.glb.pageArticles = 1;
    this.glb.articles = [];
    this.router.navigate([`/home`], { queryParams: { search: this.searchArticles } });
  }

}
