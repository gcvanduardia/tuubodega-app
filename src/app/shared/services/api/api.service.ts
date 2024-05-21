import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from "../../../../environments/environment.prod";
import { GlobalService } from "../global/global.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  get headersGet() {
    this.glb.jwt = localStorage.getItem('tuubodega-sesion-user') || '';
    let headers = new HttpHeaders().set('x-api-key', environment.api.apiKey);
    headers = headers.set('Authorization', `Bearer ${this.glb.jwt}`);
    return headers;
  }

  headers: HttpHeaders = this.headersGet;

  constructor(
    private http: HttpClient,
    private glb: GlobalService,
  ) { 
    console.log('jwt:', this.glb.jwt)
  }

  /**
   * Realiza una petición HTTP.
   * @param method - Método HTTP a utilizar ('GET', 'POST', 'PUT', 'DELETE').
   * @param url - URL de la petición.
   * @param data - Datos a enviar en la petición (opcional).
   * @returns Una promesa con la respuesta de la petición.
   */
  async sendRequest<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', relativeUrl: string, data?: any): Promise<T> {
    const url = `${environment.api.url}${relativeUrl}`;
    try {
      const requestStrategy = this.getRequestStrategy(method);
      if (!requestStrategy) {
        throw new Error(`Unsupported method: ${method}`);
      }
      const observable = requestStrategy(url, data);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error(`Hubo un error al realizar la petición ${method} a ${url}:`, error);
      throw error;
    }
  }

  private getRequestStrategy(method: 'GET' | 'POST' | 'PUT' | 'DELETE'): (url: string, data?: any) => Observable<any> {
    const strategies: { [key: string]: (url: string, data?: any) => Observable<any> } = {
      'GET': (url: string) => this.http.get(url, { headers: this.headers }),
      'POST': (url: string, data: any) => this.http.post(url, data, { headers: this.headers }),
      'PUT': (url: string, data: any) => this.http.put(url, data, { headers: this.headers }),
      'DELETE': (url: string) => this.http.delete(url, { headers: this.headers })
    };

    return strategies[method];
  }

}
