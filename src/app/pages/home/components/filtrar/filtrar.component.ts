import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonText, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption, IonList, IonSpinner, IonButtons, IonFooter, IonButton, PopoverController, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonRadio, IonRadioGroup, IonCheckbox } from '@ionic/angular/standalone';
import { GlobalService } from "../../../../shared/services/global/global.service";
import { ArticlesService } from "../../../../shared/services/articles/articles.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.scss'],
  standalone: true,
  imports: [IonCheckbox, IonRadioGroup, IonRadio, IonCardHeader, IonCardTitle, IonCardSubtitle, IonHeader, CommonModule, FormsModule, IonToolbar, IonText, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption, IonList, IonSpinner, IonButtons, IonFooter, IonButton, IonCard]
})
export class FiltrarComponent  implements OnInit {

  constructor(
    public glb: GlobalService,
    private api: ArticlesService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  async filter(){
    this.glb.filterInProcess = true;
    this.glb.pageArticles = 1;
    const products = await this.api.searchDenario();
    console.log('products filter:', products);
    this.glb.filterInProcess = false;
    this.glb.articles = [];
    this.glb.articles.push(...products[0]);
    this.glb.quatntityArticles = products[1][0].Resultados;
    this.glb.pageArticlesLimit = Math.ceil(this.glb.quatntityArticles / products[1][0].PageZise);
    console.log('this.glb.pageArticlesLimit:', this.glb.pageArticlesLimit);
  }

  async categoryChecked(category: string, value: any){
    this.glb.filterInProcess = true;
    if(value.detail.checked){
      this.glb.categoriesSelected.push(category);
    }else{
      this.glb.categoriesSelected = this.glb.categoriesSelected.filter(item => item !== category);
    }
    this.glb.categoriesSelectedString = this.glb.categoriesSelected.join(',');
    console.log('this.glb.categoriesSelected:', this.glb.categoriesSelectedString);
    /* this.filter(); */
    this.glb.searchRouter();
  }

  close(){
    this.popoverController.dismiss();
  }

}
