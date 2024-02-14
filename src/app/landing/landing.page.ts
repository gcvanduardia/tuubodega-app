import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [ IonContent]
})
export class LandingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
