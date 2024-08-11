import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  idCotizacion: number | null = null;
  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    public glb: GlobalService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idCotizacion = params['idCotizacion'];
      console.log('idCotizacion', this.idCotizacion);
    });
  }

  selectMethod(method: string) {
    if (this.idCotizacion !== null) {
      this.productService.setDeliveryMethod(method, this.idCotizacion);
      this.router.navigate([`/payment-method/${this.idCotizacion}`]);
    } else {
      console.error('idCotizacion is null');
    }
  }
}
