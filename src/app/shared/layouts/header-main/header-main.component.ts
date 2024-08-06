import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMainSubComponent } from "../header-main-sub/header-main-sub.component";
import { SearchMainComponent } from "../../components/search-main/search-main.component";
import { GlobalService } from "../../services/global/global.service";
import { IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonImg, IonButtons, IonButton, IonMenuToggle, IonIcon, IonLabel, IonBackButton, IonPopover, IonContent, IonBadge } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { MenuMainComponent } from "../menu-main/menu-main.component";
import { addIcons } from 'ionicons'; 
import { menuOutline, cartOutline, arrowBack, personOutline } from "ionicons/icons";
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import { MenuUserComponent } from "./components/menu-user/menu-user.component";
import { UserService } from "../../services/user/user.service";
import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
  standalone: true,
  imports: [IonContent, IonPopover, CommonModule, RouterModule, HeaderMainSubComponent, SearchMainComponent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonImg, IonButtons, IonButton, IonMenuToggle, IonIcon, IonLabel, MenuMainComponent, IonBackButton, MenuUserComponent, IonBadge],
})
export class HeaderMainComponent  implements OnInit {

  constructor(
    public glb: GlobalService,
    public router: Router,
    private auth: AuthService,
    private user: UserService,
    private cart: CartService
  ) { 
    addIcons({ menuOutline, cartOutline, arrowBack, personOutline });
  }

  ngOnInit() {
    this.init();
  }

  goToLandingPage(){
    window.location.href = 'https://tuubodega.com';
  }

  async init(){
    if(this.glb.idUser===0){
      await this.auth.sesion();
    }
    if (this.glb.idUser !== 0) this.cart.getAmountCart();
    console.log('idUser:', this.glb.idUser);
    if(this.glb.idUser === 0) return;
    this.user.getUser();
  }

}
