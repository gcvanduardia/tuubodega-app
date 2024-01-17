import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonText, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption, IonList, IonSpinner, IonButtons, IonFooter, IonButton, PopoverController } from '@ionic/angular/standalone';
import { GlobalService } from "../../../shared/services/global/global.service";
import { ApiService } from "../../../shared/services/api/api.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.scss'],
  standalone: true,
  imports: [IonHeader, CommonModule, FormsModule, IonToolbar, IonText, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption, IonList, IonSpinner, IonButtons, IonFooter, IonButton]
})
export class FiltrarComponent  implements OnInit {

  filterInProcess: boolean = false;

  constructor(
    public glb: GlobalService,
    private api: ApiService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  async filter(){
    this.filterInProcess = true;
    this.glb.pageArticles = 1;
    const products = await this.api.searchArticles(this.glb.searchArticles, this.glb.pageArticles, this.glb.orderArticles);
    console.log('products filter:', products);
    this.filterInProcess = false;
    this.glb.articles = [];
    this.glb.articles.push(...products[0]);
    this.glb.quatntityArticles = products[1][0].Resultados;
    this.glb.pageArticlesLimit = Math.ceil(this.glb.quatntityArticles / products[1][0].PageZise);
    console.log('this.glb.pageArticlesLimit:', this.glb.pageArticlesLimit);
  }

  close(){
    this.popoverController.dismiss();
  }

}
