import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  idCotizacion: number | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idCotizacion = params['idCotizacion'];
      console.log('idCotizacion', this.idCotizacion);
    });
  }

  selectMethod(method: string) {
    if (this.idCotizacion !== null) {
      this.productService.setPaymentMethod(method, this.idCotizacion);
      this.router.navigate([`/confirm-purchase/${this.idCotizacion}`]);
    } else {
      console.error('idCotizacion is null');
    }
  }
}
