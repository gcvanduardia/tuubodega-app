import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonButton, IonIcon, IonItem, IonSpinner, IonPopover } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { search } from "ionicons/icons";
import { GlobalService } from "../../services/global/global.service";
import { ArticlesService } from "../../services/articles/articles.service";
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PreSearchComponent } from "./pre-search/pre-search.component";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [IonPopover,  IonInput, IonButton, IonIcon, IonItem, CommonModule, FormsModule, IonSpinner ],
  providers: [PopoverController]
})
export class SearchMainComponent  implements OnInit {

  searchArticles:string = '';

  constructor(
    public glb: GlobalService,
    public api: ArticlesService,
    private route: ActivatedRoute,
    public popoverController: PopoverController
  ) {
    addIcons({ search });
  }

  ngOnInit() {
    this.getInitSearch();
  }

  async getInitSearch() {
    this.route.queryParams.subscribe(queryParams => {
      if(queryParams['search']){
        console.log("search from url: ", queryParams['search']);
        this.glb.searchArticles = queryParams['search'];
        this.searchArticles = queryParams['search'];
      }
      if(queryParams['categories']){
        console.log("categories from url: ", queryParams['categories']);
        this.glb.categoriesSelected = queryParams['categories'].split(',');
        this.glb.categoriesSelectedString = queryParams['categories'];
      }
      if(queryParams['order']){
        console.log("order from url: ", queryParams['order']);
        this.glb.orderArticles = queryParams['order'];
      }
      console.log('this.glb.searchArticles:', this.glb.searchArticles);
      console.log('this.glb.categoriesSelected:', this.glb.categoriesSelected);
      console.log('this.glb.categoriesSelectedString:', this.glb.categoriesSelectedString);
      this.glb.pageArticles = 1;
      this.search();
    });
  }
  
  async search(){
    this.glb.searchArticles = this.searchArticles;
    this.glb.pageArticles = 1;
    this.glb.searchInProcess = true;
    const products = await this.api.searchArticles();
    console.log('products searched:', products);
    this.glb.searchInProcess = false;
    this.glb.articles = products[0];
    this.glb.quatntityArticles = products[1][0].Resultados;
    this.glb.pageArticlesLimit = Math.ceil(this.glb.quatntityArticles / products[1][0].PageZise);
    this.glb.categories = products[2];
    console.log('this.glb.quatntityArticles', this.glb.quatntityArticles)
    console.log('this.glb.pageArticlesLimit:', this.glb.pageArticlesLimit);
    console.log('this.glb.categories:', this.glb.categories);
  }

  async preSearch(e: Event){
    this.glb.pageArticles = 1;
    this.glb.searchInProcess = true;
    const products = await this.api.preSearchArticles(this.searchArticles);
    this.glb.preSearchArticles = products[0].map((item:any) => item.Nombre);
    console.log('products preSearched:', this.glb.preSearchArticles);
    this.glb.searchInProcess = false;
    if(!this.isPopoverOpen && this.glb.preSearchArticles.length > 0){this.presentPopover(e);}
    if(this.glb.preSearchArticles.length == 0 || this.searchArticles == ''){
      this.popoverController.dismiss();
    }
  }

  popover: any;
  isPopoverOpen: boolean = false;
  async presentPopover(e: Event) {
    this.isPopoverOpen = true;
    this.popover = await this.popoverController.create({
      component: PreSearchComponent,
      event: e,
      mode: 'md',
      keyboardClose: false,
      backdropDismiss: true,
      cssClass: 'popover-pre-search',
    });

    await this.popover.present();
    const { role } = await this.popover.onDidDismiss();
    console.log(`Popover dismissed with role: ${role}`);
    this.isPopoverOpen = false;
  }

  searchRouter(){
    if(this.isPopoverOpen){this.popoverController.dismiss();}
    this.glb.searchArticles = this.searchArticles;
    this.glb.categoriesSelected = [];
    this.glb.categoriesSelectedString = '';
    this.glb.searchRouter();
  }

}
