import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, IonText, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [ IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, IonText, IonImg, CommonModule ]
})
export class ProductCardComponent  implements OnInit {

  @Input() product: any = {};
  

  constructor() { }

  ngOnInit() {}

}
