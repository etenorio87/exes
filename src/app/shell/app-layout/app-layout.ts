import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../core/auth.service';
import { LanguageService, SupportedLang } from '../../core/language.service';

interface NavItem {
  path: string;
  icon: string;
  labelKey: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { path: '/app/dashboard', icon: 'pi pi-chart-line', labelKey: 'shell.nav.dashboard' },
  { path: '/app/transactions', icon: 'pi pi-list', labelKey: 'shell.nav.transactions' },
  { path: '/app/categories', icon: 'pi pi-tag', labelKey: 'shell.nav.categories' },
];

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    AvatarModule,
    DrawerModule,
    MenuModule,
  ],
  templateUrl: './app-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);

  readonly user = this.auth.user;
  readonly navItems = NAV_ITEMS;
  readonly mobileSidebarOpen = signal(false);

  readonly userInitial = computed(() => {
    const email = this.user()?.email;
    return email ? email[0].toUpperCase() : '?';
  });

  readonly userMenuItems = computed<MenuItem[]>(() => {
    // Recompute when language changes (so labels reflect the new locale and
    // the active language gets the check icon).
    const cur = this.lang.current();
    const t = (k: string): string => this.translate.instant(k);
    // The menu is rendered as a flat list (a single grouped section) because
    // PrimeNG misrenders items that appear after a section with `items: [...]`
    // — top-level items with a command get demoted to plain text. Keeping the
    // language entries as nested items inside one group avoids the issue.
    const flag = (code: SupportedLang): string =>
      `<img src="/flags/${code}.svg" alt="" class="inline-block h-4 w-auto mr-2 align-middle" />`;
    const langItem = (code: SupportedLang, name: string): string => {
      const cls = cur === code ? 'font-semibold text-primary-600' : '';
      return `<span class="${cls}">${flag(code)}${name}</span>`;
    };

    return [
      {
        label: this.user()?.email ?? '',
        items: [
          {
            label: langItem('es', 'Español'),
            escape: false,
            command: () => void this.lang.setLanguage('es'),
          },
          {
            label: langItem('en', 'English'),
            escape: false,
            command: () => void this.lang.setLanguage('en'),
          },
          { separator: true },
          {
            label: t('shell.userMenu.signOut'),
            icon: 'pi pi-sign-out',
            command: () => void this.signOut(),
          },
        ],
      },
    ];
  });

  toggleMobileSidebar(): void {
    this.mobileSidebarOpen.update((v) => !v);
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }

  setLanguage(lang: SupportedLang): void {
    void this.lang.setLanguage(lang);
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigateByUrl('/auth/login');
  }
}
