import { Injectable } from '@angular/core';
import { ApiService } from "../api/api.service";
import { GlobalService } from "../global/global.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService,
    private glb: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private usr: UserService
  ) { }

  async login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }
    this.api.sendRequest('POST', '/auth/login', data)
      .then((res: any) => {
        console.log('res:', res);
        if (!res.Token) {
          alert('Error al iniciar sesión');
          return;
        }
        this.manageSuccessLogin(res.Token);
      })
      .catch((error) => {
        console.log('error:', error);
        alert(`Error al iniciar sesión: ${error.error.Message}`);
      });
  }

  async manageSuccessLogin(token: string) {
    localStorage.setItem('tuubodega-sesion-user', token);
    this.glb.jwt = token;
    this.api.headers = this.api.headersGet;
    await this.sesion();
    if(this.glb.idUser !== 0){ await this.usr.getUser(); }
    console.log('jwt:', this.glb.jwt);
    console.log('idUser:', this.glb.idUser);
    console.log('user:', this.glb.user);
    let navigation = ""
    this.route.queryParams.subscribe(params => {
      navigation = params['navigation'] ?? "";
    });
    if(navigation.length) {
      this.router.navigate([navigation]);
    } else {
      this.router.navigate(['/']);
    }
  }

  async sesion(): Promise<boolean> {
    if (this.glb.jwt === '') {
      return false;
    }
    try {
      const res: any = await this.api.sendRequest('GET', '/auth/sesion');
      if (!res.data) {
        return false;
      }
      this.glb.idUser = res.data.IdUsuario;
      return true;
    } catch (error: any) {
      console.log('error:', error.status);
      console.log('error:', error.error.message);
      if (error.status === 401) {
        localStorage.removeItem('tuubodega-sesion-user');
        this.glb.idUser = 0;
        this.glb.jwt = '';
      }
      return false;
    }
  }

  async logOut() {
    localStorage.removeItem('tuubodega-sesion-user');
    this.glb.idUser = 0;
    this.glb.jwt = '';
    window.location.reload();
  }

}
