import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../../shared/services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.sesion().then(isLoggedIn => {
      if (['/login', '/register'].includes(state.url) && isLoggedIn) {
        this.router.navigate(['/']);
        return false;
      }
      if(!['/login', '/register'].includes(state.url) && !isLoggedIn) {
        this.router.navigate(['/login']);
        return false
      }
      return true;
    });
  }

}

