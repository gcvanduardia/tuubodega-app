import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonButton, IonIcon, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { search } from "ionicons/icons";
import { GlobalService } from "../../services/global/global.service";
import { ApiService } from "../../services/api/api.service";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [ IonInput, IonButton, IonIcon, IonItem, CommonModule, FormsModule ],
})
export class SearchMainComponent  implements OnInit {

  constructor(
    public glb: GlobalService,
    private api: ApiService
  ) {
    addIcons({ search });
  }

  ngOnInit() {}

  async search(){
    this.glb.pageArticles = 1;
    this.glb.articles = [];
    const products = await this.api.searchArticles(this.glb.searchArticles, this.glb.pageArticles);
    this.glb.articles.push(...products[1]);
  }

}
