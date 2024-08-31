import { Injectable } from '@angular/core';
import { ApiService } from "../api/api.service";
import { GlobalService } from "../global/global.service";
import { DeliveryMethodPage } from 'src/app/pages/product-description/components/delivery-method/delivery-method.page';

export interface IResponseCart<T> {
  Message: string;
  data: T;
}
export interface ICartArticle {
  Cantidad: number;
  CantidadMaxima: number;
  Id: number;
  ImagenPrin: string;
  Nombre: string;
  PrecioTotal: number;
  PrecioUnit: number;
  IdArticulo: number;
}
export interface IResponseWompipayment {
  amountInCents: number;
  currency: string;
  integritySignature: string;
  publicKey: string;
  reference: string;
  idOrden: number;
}

export interface IResponseCreateCotizacion {
  idOrden: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public idOrden: number | null = null;

  constructor(
    private api: ApiService,
    public glb: GlobalService,
  ) {}

  /**
   * Realiza la compra de los artículos del carrito.
   * @returns Una promesa con la respuesta del servidor.
   */
  async buyNow() {
    try {
      const response = await this.api.sendRequest<IResponseWompipayment>('POST', '/order');
      this.idOrden = response.idOrden
      return response;
    } catch (error) {
      console.error('Hubo un error al realizar la compra:', error);
      throw error;
    }
  }

  async getDataBuyWompi(params: {id: number}): Promise<any> {
    try {
      const url = `/payments/orden/buyNow/${params.id}`;
      return await this.api.sendRequest('GET', url);
    } catch (error) {
      console.error('Hubo un error al realizar la compra:', error);
      throw error;
    }
  }

  async createCotizacionOrden(idUser: number) {
    try {
      const response = await this.api.sendRequest<IResponseCreateCotizacion>('GET', `/order/createCotizacion/${idUser}`);
      console.log('Respuesta##################:', response);
      this.idOrden = response.idOrden
      console.log('Id Orden:', this.idOrden);
      return response;
    } catch (error) {
      console.error('Hubo un error al realizar la cotizacion:', error);
      throw error;
    }
  }

  getOrdenId(){
    console.log('Id Orden:', this.idOrden);
    return this.idOrden;
  }

  /**
   * Obtiene el carrito de artículos.
   * @returns Una promesa con el carrito de artículos.
  */
  async getCartList() {
    try {
      const data = await this.api.sendRequest<IResponseCart<ICartArticle[]>>('GET', '/cart/article');
      return data.data ?? [];
    } catch (error) {
      console.error('Hubo un error al obtener el carrito de artículos:', error);
      throw error;
    }
  }

  async getSummaryCart() {
    try {
      const data = await this.api.sendRequest<IResponseCart<number>>('GET', '/cart/summary');
      return data?.data ?? 0;
    } catch (error) {
      console.error('Hubo un error al obtener el resumen del carrito:', error);
      throw error;
    }
  }

  /**
   * Elimina un artículo del carrito.
   * @param id
   * @returns Una promesa con la respuesta del servidor.
   */
  async deleteArticle(idArticulo: number) {
    try {
      const data = await this.api.sendRequest('DELETE', `/cart/article?idArticulo=${idArticulo}`);
      return data;
    } catch (error) {
      console.error('Hubo un error al eliminar el artículo del carrito:', error);
      throw error;
    }
  }

  /**
   * Actualiza la cantidad de un artículo en el carrito.
   * @param id
   * @param amount
   * @returns Una promesa con la respuesta del servidor.
  */
  async updateAmountArticle(idArticulo: number, cantidad: number) {
    try {
      const data = await this.api.sendRequest('PUT', `/cart/article`, { idArticulo, cantidad });
      return data;
    } catch (error) {
      console.error('Hubo un error al actualizar la cantidad del artículo:', error);
      throw error;
    }
  }

  /**
   * Agrega un artículo al carrito.
   * @param id
   * @param amount
   * @returns Una promesa con la respuesta del servidor.
  */
  async addArticle(idArticulo: number, cantidad: number) {
    try {
      const data = await this.api.sendRequest('POST', `/cart/article`, { idArticulo, cantidad });
    } catch (error) {
      console.error('Hubo un error al agregar el artículo al carrito:', error);
      throw error;
    }
  }

  /**
   * Obtiene la cantidad de artículos en el carrito.
   * @returns Una promesa con la cantidad de artículos en el carrito.
   * @throws Un error si no se puede obtener la cantidad de artículos en el carrito.
  */
  async getAmountCart() {
    try {
      const data = await this.api.sendRequest<IResponseCart<number>>('GET', '/cart/count');
      if (data) {
        this.glb.cartAmount = data?.data ?? 0;
      }
    } catch (error) {
      console.error('Hubo un error al obtener la cantidad del carrito:', error);
      throw error;
    }
  }

  async clearCart() {
    try {
      await this.api.sendRequest('GET', '/cart/empty');
    } catch (error) {
      console.error('Hubo un error al limpiar el carrito:', error);
      throw error;
    }
  }

  async getCotizacion(idOrden: number) {
    try {
      const data = await this.api.sendRequest('GET', `/order/getCotizacion/${idOrden}`);
      console.log('*******Orden:', data);
      return data;
    } catch (error) {
      console.error('Hubo un error al obtener la orden:', error);
      throw error;
    }
  }

  async getProductosOrden(idOrden: number) {
    try {
      const data = await this.api.sendRequest('GET', `/order/getProductos/${idOrden}`);
      return data;
    } catch (error) {
      console.error('Hubo un error al obtener los productos de la orden:', error);
      throw error;
    }
  }

  async setDeliveryMethod(method: string, idOrden: number) {
    const updateData = {
      DeliveryMethod: method
    };
    try {
      const response: any = await this.api.sendRequest('PUT', `/order/updateOrdenMethods/${idOrden}`, updateData);
      return response;
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      throw error;
    }
  }

  async setPaymentMethod(method: string, idOrden: number) {
    const updateData = {
      PaymentMethod: method
    };
    try {
      const response: any = await this.api.sendRequest('PUT', `/order/updateOrdenMethods/${idOrden}`, updateData);
      return response;
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      throw error;
    }
  }

}
