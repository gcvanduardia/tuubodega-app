import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public isMobile: boolean = this.plt.is('mobile');

  constructor(
    private plt: Platform
  ) { 
    console.log('from Global Service, isMobile: ', this.isMobile);
  }
}
