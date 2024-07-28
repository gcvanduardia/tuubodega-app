// product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productInfoSubject = new BehaviorSubject<any>(null);
  productInfo$ = this.productInfoSubject.asObservable();

  setProductInfo(productInfo: any) {
    this.productInfoSubject.next(productInfo);
    console.log("productInfo", productInfo);
  }

  getProductInfo() {
    return this.productInfoSubject.value;
  }

  setDeliveryMethod(method: string) {
    const currentInfo = this.productInfoSubject.value || {};
    currentInfo.deliveryMethod = method;
    this.productInfoSubject.next(currentInfo);
    console.log("deliveryMethod", method);
  }

  setPaymentMethod(method: string) {
    const currentInfo = this.productInfoSubject.value || {};
    currentInfo.paymentMethod = method;
    this.productInfoSubject.next(currentInfo);
    console.log("paymentMethod", method);
  }
}