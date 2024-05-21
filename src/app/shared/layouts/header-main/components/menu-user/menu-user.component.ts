import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonLabel, IonList, IonItem, IonListHeader, IonButton, IonAvatar, IonIcon, IonInput, PopoverController } from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { GlobalService } from "../../../../services/global/global.service";
import { AuthService } from "../../../../services/auth/auth.service";
import { addIcons } from 'ionicons'; 
import { personOutline, heartOutline, logOutOutline } from "ionicons/icons";

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss'],
  standalone: true,
  imports: [CommonModule, IonInput, IonIcon, IonAvatar, IonButton, IonListHeader, IonItem, IonList, IonLabel, IonContent, RouterModule]
})
export class MenuUserComponent  implements OnInit {

  constructor(
    public glb: GlobalService,
    public auth: AuthService,
    private router: Router,
    private popover: PopoverController
  ) { 
    addIcons({ personOutline, heartOutline, logOutOutline });
  }

  ngOnInit() {}

  goToLogin(){
    this.popover.dismiss();
    this.router.navigate(['/login']);
  }

}
