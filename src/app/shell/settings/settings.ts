import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { LanguageService, SupportedLang } from '../../core/language.service';
import { Currency, DateFormat, UserPreferencesService } from '../../core/user-preferences.service';

const CURRENCY_OPTIONS: { label: string; value: Currency }[] = [
  { label: '€ EUR', value: 'EUR' },
  { label: '$ USD', value: 'USD' },
  { label: '£ GBP', value: 'GBP' },
];

const DATE_FORMAT_OPTIONS: { label: string; value: DateFormat }[] = [
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
];

const LANGUAGE_OPTIONS: { label: string; value: SupportedLang; flag: string }[] = [
  { label: 'Español', value: 'es', flag: '/flags/es.svg' },
  { label: 'English', value: 'en', flag: '/flags/en.svg' },
];

@Component({
  selector: 'app-settings',
  imports: [FormsModule, TranslateModule, ButtonModule, SelectModule],
  templateUrl: './settings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  private readonly prefs = inject(UserPreferencesService);
  private readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);
  private readonly message = inject(MessageService);

  readonly currencyOptions = CURRENCY_OPTIONS;
  readonly dateFormatOptions = DATE_FORMAT_OPTIONS;
  readonly languageOptions = LANGUAGE_OPTIONS;

  readonly currency = signal<Currency>(this.prefs.currency());
  readonly dateFormat = signal<DateFormat>(this.prefs.dateFormat());
  readonly language = signal<SupportedLang>(this.lang.current() as SupportedLang);
  readonly saving = signal(false);

  constructor() {
    const pageTitle = inject(Title);
    effect(() => {
      this.lang.current();
      pageTitle.setTitle(`EXES — ${this.translate.instant('settings.title')}`);
    });

    // Sync signals when preferences load from profile (async)
    effect(() => {
      this.currency.set(this.prefs.currency());
      this.dateFormat.set(this.prefs.dateFormat());
      this.language.set(this.lang.current() as SupportedLang);
    });
  }

  async save(): Promise<void> {
    if (this.saving()) return;
    this.saving.set(true);
    try {
      await this.prefs.update({
        currency: this.currency(),
        date_format: this.dateFormat(),
      });
      await this.lang.setLanguage(this.language());
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('settings.savedToast'),
      });
    } catch {
      this.message.add({
        severity: 'error',
        summary: this.translate.instant('transactions.errors.generic'),
      });
    } finally {
      this.saving.set(false);
    }
  }
}
