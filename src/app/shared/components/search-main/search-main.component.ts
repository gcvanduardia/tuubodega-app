import { Component, OnInit } from '@angular/core';
import { IonInput, IonButton, IonIcon, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { search } from "ionicons/icons";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [ IonInput, IonButton, IonIcon, IonItem ]
})
export class SearchMainComponent  implements OnInit {

  constructor() {
    addIcons({ search });
  }

  ngOnInit() {}

}
