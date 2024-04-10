import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonText, IonButtons, IonGrid, IonRow, IonCol, IonPopover, IonButton, IonIcon } from '@ionic/angular/standalone';
import { GlobalService } from "../../../shared/services/global/global.service";
import { addIcons } from 'ionicons'; 
import { chevronDown } from "ionicons/icons";
import { FiltrarComponent } from "../filtrar/filtrar.component";
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-header-serach',
  templateUrl: './header-serach.component.html',
  styleUrls: ['./header-serach.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonText, IonButtons, IonGrid, IonRow, IonCol, IonPopover, IonButton, IonIcon, FiltrarComponent],
  providers: [PopoverController]
})
export class HeaderSerachComponent  implements OnInit {

  customPopoverOptions = {
    subHeader: 'Filtrar por: '
  };

  constructor(
    public glb: GlobalService,
    public popoverController: PopoverController
  ) { 
    addIcons({ chevronDown })
  }

  ngOnInit() {}

  async presentPopover(e: Event) {  
    console.log('show popover');
    const popover = await this.popoverController.create({
      component: FiltrarComponent,
      event: e,
      cssClass: 'ion-popover',
    });

    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log(`Popover dismissed with role: ${role}`);
  }

  getSelectedCategoryNames() {
    return this.glb.categories
      .filter(category => this.glb.categoriesSelected.includes(category.IdCategoria.toString()))
      .map(category => category.Nombre);
  }

}
