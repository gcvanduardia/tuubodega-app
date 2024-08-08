import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },
  { path: 'product-description/:id', loadComponent: () => import('./pages/product-description/product-description.page').then(m => m.ProductDescriptionPage) },
  { path: 'delivery-method/:cod/:idProducto/:idUsuario', loadComponent: () => import('./pages/product-description/components/delivery-method/delivery-method.page').then(m => m.DeliveryMethodPage) },
  { path: 'payment-method/:cod/:idProducto/:idUsuario', loadComponent: () => import('./pages/product-description/components/payment-method/payment-method.page').then(m => m.PaymentMethodPage) },
  { path: 'confirm-purchase/:cod/:idProducto/:idUsuario', loadComponent: () => import('./pages/product-description/components/confirm-purchase/confirm-purchase.page').then(m => m.ConfirmPurchasePage) },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage), canActivate: [AuthGuard] }
];
