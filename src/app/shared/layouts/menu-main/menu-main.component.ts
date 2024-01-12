import { Component, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.scss'],
  standalone: true,
  imports: [ IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonButton ] 
})
export class MenuMainComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
