import { effect, inject, Injector, runInInjectionContext } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Protects routes that require an authenticated user.
 *
 * `AuthService.bootstrap()` is async, so on a hard reload the user signal may
 * still be `null` even though a session exists. We wait for `ready` before
 * deciding, so we never bounce a logged-in user to /auth/login on F5.
 */
export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const injector = inject(Injector);

  if (!auth.ready()) {
    await new Promise<void>((resolve) => {
      runInInjectionContext(injector, () => {
        const ref = effect(() => {
          if (auth.ready()) {
            ref.destroy();
            resolve();
          }
        });
      });
    });
  }

  return auth.isAuthenticated() ? true : router.parseUrl('/auth/login');
};

/**
 * Inverse of authGuard: keeps already-logged-in users out of /auth/* pages.
 */
export const guestGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const injector = inject(Injector);

  if (!auth.ready()) {
    await new Promise<void>((resolve) => {
      runInInjectionContext(injector, () => {
        const ref = effect(() => {
          if (auth.ready()) {
            ref.destroy();
            resolve();
          }
        });
      });
    });
  }

  return auth.isAuthenticated() ? router.parseUrl('/app/home') : true;
};
