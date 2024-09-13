import { Injectable } from '@angular/core';
import { BehaviorSubject, window } from 'rxjs';
import { ApiService } from '../api/api.service';
import { GlobalService } from '../global/global.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

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
  private auth: AuthService;
  private idCotizacion: number | null = null;
  

  constructor(private apiService: ApiService, glb: GlobalService, auth: AuthService, private router: Router) {
    this.glb = glb;
    this.auth = auth;
  }

  async setProductInfo(productInfo: any, cantidad: number) {
    try {
      const response = await this.apiService.sendRequest<ApiResponse>('POST', '/payments/cotizaciones', {
        "Descripcion": productInfo.Descripcion[0].valor,
        "IdUsuario": this.glb.user.IdUser,
        "IdProducto": productInfo.Id,
        "IdCategoria": productInfo.IdCategoria,
        "Marca": productInfo.Marca,
        "Modelo": productInfo.Modelo,
        "SKU": productInfo.SKU,
        "Stock": cantidad,
        "Nombre": productInfo.Titulo,
        "UrlFotos": productInfo.UrlFotos[0],
        "Usr": productInfo.Usr,
        "DeliveryMethod": null,
        "PaymentMethod": null,
        "ValorUnt": productInfo.ValorUnt
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

  async getUserByIdCotizacion(idCotizacion: number) {
    try {
      const response: any = await this.apiService.sendRequest('GET', `/payments/cotizaciones/getIdUser/${idCotizacion}`);
      return response;
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      throw error;
    }
  }

  async compareIdUsers(idCotizacion: number | null) {
    if(this.glb.idUser === 0){
      await this.auth.sesion();
    }
    console.log('***idUser:', this.glb.idUser);

    if (idCotizacion !== null) {
      const result = await this.getUserByIdCotizacion(idCotizacion);
      console.log('********IdUserCotizacion:', result.IdUsuario);
      console.log('********IdProducto: ', result.IdProducto);

      if(this.glb.idUser !== result.IdUsuario){
        this.router.navigate(['/product-description/', result.IdProducto]);
      }
    } else {
      console.error('idCotizacion es null');
    }
  }
 
}