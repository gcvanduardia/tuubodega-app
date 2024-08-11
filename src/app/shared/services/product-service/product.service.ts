import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { GlobalService } from '../global/global.service';

interface ApiResponse {
  IdCotizacion: number;
  // Otros campos que esperas en la respuesta de la API
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productInfoSubject = new BehaviorSubject<any>(null);
  productInfo$ = this.productInfoSubject.asObservable();
  private glb: GlobalService;
  private idCotizacion: number | null = null;
  

  constructor(private apiService: ApiService, glb: GlobalService) {
    this.glb = glb;
  }

  async setProductInfo(productInfo: any, cantidad: number) {
    try {
      const response = await this.apiService.sendRequest<ApiResponse>('POST', '/payments/cotizaciones', {
        "IdUsuario": this.glb.user.IdUser,
        "IdProducto": productInfo.Id,
        "Cantidad": cantidad,
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
      console.log('******Id Cotizacion:', response.IdCotizacion);
      console.log('******Id Usuario:', this.glb.user.IdUser);
      this.idCotizacion = response.IdCotizacion;
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
    }
  }

  getIdCotizacion(): number | null {
    return this.idCotizacion;
  }

  async getProductInfo(idCotizacion: number): Promise<any> {
    try {
      const response: any = await this.apiService.sendRequest('GET', `/payments/cotizaciones/${idCotizacion}`);
      return response;
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      throw error;
    }
  }

  async setDeliveryMethod(method: string, idCotizacion: number) {
    const updateData = {
      DeliveryMethod: method
    };
    try {
      const response: any = await this.apiService.sendRequest('PUT', `/payments/cotizaciones/${idCotizacion}`, updateData);
      return response;
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      throw error;
    }
  }

  async setPaymentMethod(method: string, idCotizacion: number) {
    const updateData = {
      PaymentMethod: method
    };
    try {
      const response: any = await this.apiService.sendRequest('PUT', `/payments/cotizaciones/${idCotizacion}`, updateData);
      return response;
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      throw error;
    }
  }
}