import { Injectable } from '@angular/core';
import { ApiService } from "../api/api.service";
import { GlobalService } from "../global/global.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
    private glb: GlobalService
  ) { }

  async getUser(){
    const data = { IdUser: this.glb.idUser }
    try {
      const res: any = await this.api.sendRequest('POST', '/users/userById', data);
      if(res){
        this.glb.user = res;
        console.log('user:', this.glb.user);
      } else {
        alert('Error al obtener usuario');
      }
    } catch (error) {
      console.log('error:', error);
      alert('Error al obtener usuario');
    }
  }

}
