import { Injectable } from '@angular/core';
import { ApiService } from "../api/api.service";
import { GlobalService } from "../global/global.service";

export interface IResponseRegister {
  Message: string;
  data: boolean
};

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(
    private api: ApiService,
    public glb: GlobalService
  ) {}

  async register(params: any) {
    try {
      return await this.api.sendRequest<IResponseRegister>('POST', '/register', params);
    } catch (error: any) {
      return error.error
    }
  }

  async sendCode(params: { email: string }) {
    try {
      return await this.api.sendRequest<IResponseRegister>('POST', '/register/code', params);
    } catch (error: any) {
      return error.error
    }
  }

  async validateCode(params: { email: string, code: string }) {
    try {
      return await this.api.sendRequest<IResponseRegister>('POST', '/register/verification-code', params);
    } catch (error: any) {
      return error.error
    }
  }



}
