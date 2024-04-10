import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from "../../../services/global/global.service";
import { IonLabel, IonList, IonItem, IonContent } from "@ionic/angular/standalone";
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pre-search',
  templateUrl: './pre-search.component.html',
  styleUrls: ['./pre-search.component.scss'],
  imports: [CommonModule, IonContent, IonLabel, IonList, IonItem],
  standalone: true,
})
export class PreSearchComponent  implements OnInit {

  constructor(
    public glb: GlobalService,
    public popoverController: PopoverController
  ) { 
    console.log('preSearchArticles: ', this.glb.preSearchArticles)
  }

  ngOnInit() {}

  search(article:string){
    console.log('search: ', article)
    this.popoverController.dismiss();
    this.glb.searchArticles = article;
    this.glb.categoriesSelected = [];
    this.glb.categoriesSelectedString = '';
    this.glb.searchRouter();
  }

}
