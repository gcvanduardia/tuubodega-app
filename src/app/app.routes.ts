import { Routes } from '@angular/router';
import { AuthGuard } from "./core/guard/auth/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  { path: '', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage), },
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage), },
  { path: 'product-description/:id', loadComponent: () => import('./pages/product-description/product-description.page').then( m => m.ProductDescriptionPage) },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage), canActivate: [AuthGuard] }
];
