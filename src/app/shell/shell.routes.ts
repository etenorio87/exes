import { Routes } from '@angular/router';

export const shellRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
