import { Routes } from '@angular/router';
import { guestGuard } from '../core/auth.guard';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () => import('./login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent: () => import('./register/register').then((m) => m.Register),
      },
      {
        path: 'recover',
        canActivate: [guestGuard],
        loadComponent: () => import('./recover/recover').then((m) => m.Recover),
      },
      {
        // Reset must be reachable even when "logged in" because Supabase signs
        // the user in temporarily via the recovery token in the URL.
        path: 'reset',
        loadComponent: () => import('./reset/reset').then((m) => m.Reset),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];
