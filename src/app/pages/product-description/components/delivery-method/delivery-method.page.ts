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
  cod: any;
  idProducto: number = 0;
  idUsuario: number = 0;
  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    public glb: GlobalService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cod = params['cod'];
      this.idProducto = +params['idProducto'];
      this.idUsuario = +params['idUsuario'];
      console.log('cod', this.cod);
      console.log('idProducto', this.idProducto);
      console.log('idUsuario', this.idUsuario);
    });
  }

  selectMethod(method: string) {
    this.productService.setDeliveryMethod(method, this.cod, this.idProducto, this.idUsuario);
    this.router.navigate([`/payment-method/${this.cod}/${this.idProducto}/${this.idUsuario}`]);
  }
}
