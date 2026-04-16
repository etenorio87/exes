import { Routes } from '@angular/router';

export const shellRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app-layout/app-layout').then((m) => m.AppLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'transactions',
        loadComponent: () => import('./transactions/transactions').then((m) => m.Transactions),
      },
      {
        path: 'categories',
        loadComponent: () => import('./categories/categories').then((m) => m.Categories),
      },
      // Backwards compat: bookmarked /app/home from sub-fase 1.1.
      { path: 'home', redirectTo: 'dashboard' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
