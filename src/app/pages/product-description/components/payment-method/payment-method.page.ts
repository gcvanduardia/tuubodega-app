import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMainComponent } from "../../../../shared/layouts/header-main/header-main.component";
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput } from '@ionic/angular/standalone';
import { ProductService } from '../../../../shared/services/product-service/product.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
  standalone: true,
  imports: [IonContent, HeaderMainComponent, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonButton, IonRadioGroup, IonRadio, IonItem, IonInput]
})
export class PaymentMethodPage {
  constructor(private router: Router, private productService: ProductService) {}

  selectMethod(method: string) {
    this.productService.setPaymentMethod(method);
    this.router.navigate(['/confirm-purchase']);
  }
}
