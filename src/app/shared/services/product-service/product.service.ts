import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productInfoSubject = new BehaviorSubject<any>(null);
  productInfo$ = this.productInfoSubject.asObservable();
  private glb: GlobalService;

  constructor(private apiService: ApiService, glb: GlobalService) {
    this.glb = glb;
  }

  async setProductInfo(productInfo: any) {
    try {
      const response = await this.apiService.sendRequest('POST', '/payments/cotizaciones', {
        "IdUsuario": this.glb.user.IdUser,
        "IdProducto": productInfo.Id,
        "Cantidad": productInfo.Cantidad,
        "Codigo": productInfo.Cod,
        "Descripcion": productInfo.Descripcion,
        "IdCategoria": productInfo.IdCategoria,
        "IdSubCategoria1": productInfo.IdSubCategoria1,
        "Imagenes": productInfo.Imagenes,
        "ImagenesArray": productInfo.ImagenesArray,
        "Nombre": productInfo.Nombre,
        "PrecioUnit": productInfo.PrecioUnit,
        "DeliveryMethod": null,
        "PaymentMethod": null
      });
      console.log('Respuesta de la API:', response);
      console.log('******Id Usuario:', this.glb.user.IdUser);
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
    }
  }

  async getProductInfo(cod: number, idProducto: number, idUsuario: number): Promise<any> {
    try {
      const response: any = await this.apiService.sendRequest('GET', `/payments/cotizaciones/${cod}?IdProducto=${idProducto}&IdUsuario=${idUsuario}`);
      return response;
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      throw error;
    }
  }

  async setDeliveryMethod(method: string, cod: number, idProducto: number, idUsuario: number) {
    const updateData = {
      DeliveryMethod: method
    };
    try {
      const response: any = await this.apiService.sendRequest('PUT', `/payments/cotizaciones/${cod}?IdProducto=${idProducto}&IdUsuario=${idUsuario}`, updateData);
      return response;
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      throw error;
    }
  }

  async setPaymentMethod(method: string, cod: number, idProducto: number, idUsuario: number) {
    const updateData = {
      PaymentMethod: method
    };
    try {
      const response: any = await this.apiService.sendRequest('PUT', `/payments/cotizaciones/${cod}?IdProducto=${idProducto}&IdUsuario=${idUsuario}`, updateData);
      return response;
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      throw error;
    }
  }
}