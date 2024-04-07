import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, IonText, IonImg, IonIcon, IonList, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { GlobalService } from "../../services/global/global.service";

@Component({
  selector: 'app-filter-main',
  templateUrl: './filter-main.component.html',
  styleUrls: ['./filter-main.component.scss'],
  standalone: true,
  imports: [ FormsModule, IonLabel, IonItem, IonList, IonIcon,  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, IonText, IonImg, CommonModule, IonSelect, IonSelectOption ]
})
export class FilterMainComponent  implements OnInit {

  constructor( 
    public glb: GlobalService
  ) { }

  ngOnInit() {}

}
