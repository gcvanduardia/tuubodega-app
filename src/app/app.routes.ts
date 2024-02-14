import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  { path: 'home', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), },
  { path: 'home/:search', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), },
  { path: 'product-description/:id', loadComponent: () => import('./product-description/product-description.page').then( m => m.ProductDescriptionPage) },
  { path: '', loadComponent: () => import('./landing/landing.page').then( m => m.LandingPage) },
];
