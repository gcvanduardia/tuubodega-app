import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { GlobalService } from "../../services/global/global.service";
import { addIcons } from 'ionicons'; 
import { locationOutline } from "ionicons/icons";

@Component({
  selector: 'app-header-main-sub',
  templateUrl: './header-main-sub.component.html',
  styleUrls: ['./header-main-sub.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon],
})
export class HeaderMainSubComponent  implements OnInit {

  constructor(
    public glb: GlobalService
  ) { 
    addIcons({ locationOutline });
  }

  ngOnInit() {}

}
