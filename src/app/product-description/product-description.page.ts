import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderMainComponent } from "../shared/layouts/header-main/header-main.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.page.html',
  styleUrls: ['./product-description.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, HeaderMainComponent]
})
export class ProductDescriptionPage implements OnInit {

  id: number = 0;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("id producto: ",this.id); // Aquí está tu id de producto
    });
  }

}
