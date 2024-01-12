import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMainSubComponent } from "../header-main-sub/header-main-sub.component";
import { SearchMainComponent } from "../../components/search-main/search-main.component";
import { GlobalService } from "../../services/global/global.service";
import { IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonImg, IonButtons, IonButton, IonMenuToggle, IonIcon, IonLabel, IonBackButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { MenuMainComponent } from "../menu-main/menu-main.component";
import { addIcons } from 'ionicons'; 
import { menuOutline, cartOutline } from "ionicons/icons";
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderMainSubComponent, SearchMainComponent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonImg, IonButtons, IonButton, IonMenuToggle, IonIcon, IonLabel, MenuMainComponent, IonBackButton],
})
export class HeaderMainComponent  implements OnInit {

  constructor(
    public glb: GlobalService,
    public router: Router
  ) { 
    addIcons({ menuOutline, cartOutline })
  }

  ngOnInit() {}

}
