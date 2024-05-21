import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonButton, IonIcon, IonChip, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { GlobalService } from "../../services/global/global.service";
import { addIcons } from 'ionicons'; 
import { locationOutline } from "ionicons/icons";

@Component({
  selector: 'app-header-main-sub',
  templateUrl: './header-main-sub.component.html',
  styleUrls: ['./header-main-sub.component.scss'],
  standalone: true,
  imports: [RouterModule, IonRouterOutlet, IonLabel, IonChip, CommonModule, IonButton, IonIcon],
})
export class HeaderMainSubComponent  implements OnInit {

  constructor(
    public glb: GlobalService
  ) { 
    addIcons({ locationOutline });
  }

  ngOnInit() {}

  ubicacion() {
    console.log('ubicacion');
  }

}
