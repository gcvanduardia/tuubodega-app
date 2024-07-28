import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMainComponent } from "../../../../shared/layouts/header-main/header-main.component";
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput } from '@ionic/angular/standalone';
import { ProductService } from '../../../../shared/services/product-service/product.service';
import { GlobalService } from "../../../../shared/services/global/global.service";

@Component({
  selector: 'app-delivery-method',
  templateUrl: './delivery-method.page.html',
  styleUrls: ['./delivery-method.page.scss'],
  standalone: true,
  imports: [IonContent, HeaderMainComponent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput]
})
export class DeliveryMethodPage {
  constructor(private router: Router, private productService: ProductService, public glb: GlobalService,) {}

  selectMethod(method: string) {
    this.productService.setDeliveryMethod(method);
    this.router.navigate(['/payment-method']);
  }
}
