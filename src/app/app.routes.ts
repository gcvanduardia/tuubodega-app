import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },
  { path: 'product-description/:id', loadComponent: () => import('./pages/product-description/product-description.page').then(m => m.ProductDescriptionPage) },
  { path: 'delivery-method/:idCotizacion', loadComponent: () => import('./pages/product-description/components/delivery-method/delivery-method.page').then(m => m.DeliveryMethodPage) },
  { path: 'delivery-method/cart/:idOrden', loadComponent: () => import('./pages/product-description/components/delivery-method/delivery-method.page').then(m => m.DeliveryMethodPage) },
  { path: 'payment-method/:idCotizacion', loadComponent: () => import('./pages/product-description/components/payment-method/payment-method.page').then(m => m.PaymentMethodPage) },
  { path: 'payment-method/cart/:idOrden', loadComponent: () => import('./pages/product-description/components/payment-method/payment-method.page').then(m => m.PaymentMethodPage) },
  { path: 'confirm-purchase/:idCotizacion', loadComponent: () => import('./pages/product-description/components/confirm-purchase/confirm-purchase.page').then(m => m.ConfirmPurchasePage) },
  { path: 'confirm-purchase/cart/:idOrden', loadComponent: () => import('./pages/product-description/components/confirm-purchase/confirm-purchase.page').then(m => m.ConfirmPurchasePage) },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart.page').then( m => m.CartPage), canActivate: [AuthGuard] },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage), canActivate: [AuthGuard] }
];

