import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

const SUPPORTED_LANGS = ['es', 'en'] as const;
const DEFAULT_LANG = 'es';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng, components, utilities',
          },
        },
      },
    }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: DEFAULT_LANG,
      lang: resolveInitialLang(),
    }),
    MessageService,
    ConfirmationService,
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

/**
 * Pick the initial UI language:
 *   1. value previously stored in localStorage (user choice)
 *   2. browser language if supported
 *   3. DEFAULT_LANG (es)
 *
 * When the user logs in, `LanguageService` (Fase 1) overrides this with the
 * value persisted in `profiles.language`.
 */
function resolveInitialLang(): string {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('lang');
    if (stored && (SUPPORTED_LANGS as readonly string[]).includes(stored)) {
      return stored;
    }
  }
  if (typeof navigator !== 'undefined') {
    const browser = navigator.language.split('-')[0];
    if ((SUPPORTED_LANGS as readonly string[]).includes(browser)) {
      return browser;
    }
  }
  return DEFAULT_LANG;
}
