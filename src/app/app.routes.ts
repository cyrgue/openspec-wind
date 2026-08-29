import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'wind',
    loadComponent: () => import('./wind-page/wind-page').then((m) => m.WindPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login-page/login-page').then((m) => m.LoginPage),
  },
];
