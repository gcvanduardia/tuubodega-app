import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonText, IonButtons, IonGrid, IonRow, IonCol, IonPopover, IonButton, IonIcon } from '@ionic/angular/standalone';
import { GlobalService } from "../../../shared/services/global/global.service";
import { addIcons } from 'ionicons'; 
import { chevronDown } from "ionicons/icons";
import { FiltrarComponent } from "../filtrar/filtrar.component";

@Component({
  selector: 'app-header-serach',
  templateUrl: './header-serach.component.html',
  styleUrls: ['./header-serach.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonText, IonButtons, IonGrid, IonRow, IonCol, IonPopover, IonButton, IonIcon, FiltrarComponent]
})
export class HeaderSerachComponent  implements OnInit {

  customPopoverOptions = {
    subHeader: 'Filtrar por: '
  };

  constructor(
    public glb: GlobalService
  ) { 
    addIcons({ chevronDown })
  }

  ngOnInit() {}

}
