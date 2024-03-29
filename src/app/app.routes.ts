import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  { path: '', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), },
  { path: 'home', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), },
  { path: 'home/:search', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), },
  { path: 'search/:search', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), },
  { path: 'product-description/:id', loadComponent: () => import('./product-description/product-description.page').then( m => m.ProductDescriptionPage) }
];
