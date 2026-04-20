import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { Account, AccountsService } from '../../core/accounts.service';
import { AuthService } from '../../core/auth.service';
import { LanguageService, SupportedLang } from '../../core/language.service';
import { BackupData, RestoreOptions, RestoreService } from '../../core/restore.service';
import { SupabaseService } from '../../core/supabase.service';
import {
  Currency,
  DateFormat,
  Theme,
  UserPreferencesService,
} from '../../core/user-preferences.service';

const CURRENCY_OPTIONS: { label: string; value: Currency }[] = [
  { label: '€ EUR', value: 'EUR' },
  { label: '$ USD', value: 'USD' },
  { label: '£ GBP', value: 'GBP' },
];

const DATE_FORMAT_OPTIONS: { label: string; value: DateFormat }[] = [
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
];

const THEME_OPTIONS: { label: string; value: Theme; icon: string }[] = [
  { label: '☀ Claro', value: 'light', icon: 'pi pi-sun' },
  { label: '🌙 Oscuro', value: 'dark', icon: 'pi pi-moon' },
];

const LANGUAGE_OPTIONS: { label: string; value: SupportedLang; flag: string }[] = [
  { label: 'Español', value: 'es', flag: '/flags/es.svg' },
  { label: 'English', value: 'en', flag: '/flags/en.svg' },
];

@Component({
  selector: 'app-settings',
  imports: [
    FormsModule,
    TranslateModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    TooltipModule,
  ],
  templateUrl: './settings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  private readonly prefs = inject(UserPreferencesService);
  private readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);
  private readonly message = inject(MessageService);
  private readonly confirm = inject(ConfirmationService);
  private readonly auth = inject(AuthService);
  private readonly supabase = inject(SupabaseService);
  private readonly restoreService = inject(RestoreService);
  private readonly router = inject(Router);
  readonly accounts = inject(AccountsService);

  readonly currencyOptions = CURRENCY_OPTIONS;
  readonly dateFormatOptions = DATE_FORMAT_OPTIONS;
  readonly themeOptions = THEME_OPTIONS;
  readonly languageOptions = LANGUAGE_OPTIONS;

  readonly currency = signal<Currency>(this.prefs.currency());
  readonly dateFormat = signal<DateFormat>(this.prefs.dateFormat());
  readonly theme = signal<Theme>(this.prefs.theme());
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
      this.theme.set(this.prefs.theme());
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
      await this.prefs.setTheme(this.theme());
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

  // ─── Accounts ──────────────────────────────────────────────────────────
  readonly newAccountName = signal('');
  readonly accountSaving = signal(false);
  readonly editingAccount = signal<Account | null>(null);
  readonly editAccountName = signal('');

  async addAccount(): Promise<void> {
    const name = this.newAccountName().trim();
    if (!name || this.accountSaving()) return;
    this.accountSaving.set(true);
    try {
      await this.accounts.create({ name });
      this.newAccountName.set('');
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('settings.accounts.savedToast'),
      });
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      const detail =
        code === '23505'
          ? this.translate.instant('settings.accounts.errors.duplicateName')
          : this.translate.instant('settings.accounts.errors.generic');
      this.message.add({ severity: 'error', summary: detail, life: 6000 });
    } finally {
      this.accountSaving.set(false);
    }
  }

  startRename(account: Account): void {
    this.editingAccount.set(account);
    this.editAccountName.set(account.name);
  }

  cancelRename(): void {
    this.editingAccount.set(null);
  }

  async saveRename(): Promise<void> {
    const account = this.editingAccount();
    const name = this.editAccountName().trim();
    if (!account || !name) return;
    try {
      await this.accounts.rename(account.id, name);
      this.editingAccount.set(null);
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('settings.accounts.savedToast'),
      });
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      const detail =
        code === '23505'
          ? this.translate.instant('settings.accounts.errors.duplicateName')
          : this.translate.instant('settings.accounts.errors.generic');
      this.message.add({ severity: 'error', summary: detail, life: 6000 });
    }
  }

  async makeDefault(account: Account): Promise<void> {
    try {
      await this.accounts.setDefault(account.id);
    } catch {
      this.message.add({
        severity: 'error',
        summary: this.translate.instant('settings.accounts.errors.generic'),
        life: 6000,
      });
    }
  }

  confirmDeleteAccount(account: Account): void {
    if (account.is_default) {
      this.message.add({
        severity: 'warn',
        summary: this.translate.instant('settings.accounts.cannotDeleteDefault'),
        life: 4000,
      });
      return;
    }
    this.confirm.confirm({
      message: this.translate.instant('settings.accounts.deleteConfirm', { name: account.name }),
      header: this.translate.instant('common.confirm'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('common.delete'),
      rejectLabel: this.translate.instant('common.cancel'),
      acceptButtonProps: { severity: 'danger' },
      accept: () => void this.doDeleteAccount(account),
    });
  }

  private async doDeleteAccount(account: Account): Promise<void> {
    try {
      await this.accounts.softDelete(account.id);
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('settings.accounts.deletedToast'),
      });
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      const detail =
        code === '23503'
          ? this.translate.instant('settings.accounts.cannotDeleteInUse')
          : this.translate.instant('settings.accounts.errors.generic');
      this.message.add({ severity: 'error', summary: detail, life: 6000 });
    }
  }

  // ─── Data export & account deletion (GDPR) ─────────────────────────────
  readonly exporting = signal(false);
  readonly deleteDialogOpen = signal(false);
  readonly deleteConfirmText = signal('');
  readonly deleting = signal(false);

  /** Confirmation keyword depends on language */
  get deleteKeyword(): string {
    return this.lang.current() === 'es' ? 'ELIMINAR' : 'DELETE';
  }

  async exportData(): Promise<void> {
    if (this.exporting()) return;
    this.exporting.set(true);
    try {
      const client = this.supabase.client;
      const [categories, accounts, transactions, budgets, transfers] = await Promise.all([
        client.from('categories').select('*'),
        client.from('accounts').select('*'),
        client.from('transactions').select('*'),
        client.from('budgets').select('*'),
        client.from('transfers').select('*'),
      ]);

      const backup = {
        exported_at: new Date().toISOString(),
        categories: categories.data ?? [],
        accounts: accounts.data ?? [],
        transactions: transactions.data ?? [],
        budgets: budgets.data ?? [],
        transfers: transfers.data ?? [],
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `exes-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);

      this.message.add({
        severity: 'success',
        summary: this.translate.instant('settings.data.exportedToast'),
      });
    } finally {
      this.exporting.set(false);
    }
  }

  openDeleteDialog(): void {
    this.deleteConfirmText.set('');
    this.deleteDialogOpen.set(true);
  }

  async confirmDeleteUserAccount(): Promise<void> {
    if (this.deleteConfirmText().toUpperCase() !== this.deleteKeyword) return;
    this.deleting.set(true);
    try {
      const { error } = await this.supabase.client.rpc('delete_user_account');
      if (error) throw error;
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('settings.data.deletedToast'),
      });
      await this.auth.signOut();
      void this.router.navigate(['/auth/login']);
    } catch {
      this.message.add({
        severity: 'error',
        summary: this.translate.instant('settings.data.deleteError'),
        life: 6000,
      });
    } finally {
      this.deleting.set(false);
      this.deleteDialogOpen.set(false);
    }
  }

  // ─── Restore from backup ───────────────────────────────────────────────
  readonly restoreDialogOpen = signal(false);
  readonly restoreData = signal<BackupData | null>(null);
  readonly restoring = signal(false);
  readonly restoreOptions = signal<RestoreOptions>({
    categories: true,
    accounts: true,
    transactions: true,
    budgets: true,
    transfers: true,
  });

  onRestoreFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = this.restoreService.parseBackup(reader.result as string);
      if (!data || this.isBackupEmpty(data)) {
        this.message.add({
          severity: 'warn',
          summary: this.translate.instant('settings.data.restoreNoData'),
          life: 4000,
        });
        return;
      }
      this.restoreData.set(data);
      this.restoreOptions.set({
        categories: data.categories.filter((c) => !c.is_predefined).length > 0,
        accounts: data.accounts.length > 0,
        transactions: data.transactions.length > 0,
        budgets: data.budgets.length > 0,
        transfers: data.transfers.length > 0,
      });
      this.restoreDialogOpen.set(true);
    };
    reader.readAsText(file);
    // Reset the input so the same file can be selected again
    input.value = '';
  }

  private isBackupEmpty(data: BackupData): boolean {
    return (
      data.categories.length === 0 &&
      data.accounts.length === 0 &&
      data.transactions.length === 0 &&
      data.budgets.length === 0 &&
      data.transfers.length === 0
    );
  }

  setRestoreOption(key: keyof RestoreOptions, value: boolean): void {
    const opts = { ...this.restoreOptions() };
    opts[key] = value;
    // Auto-enable dependencies
    if (value) {
      if (key === 'transactions') {
        opts.categories = true;
        opts.accounts = true;
      }
      if (key === 'budgets') opts.categories = true;
      if (key === 'transfers') opts.accounts = true;
    }
    // Auto-disable dependents
    if (!value) {
      if (key === 'categories') opts.budgets = false;
      if (key === 'accounts') opts.transfers = false;
      if (key === 'categories' || key === 'accounts') opts.transactions = false;
    }
    this.restoreOptions.set(opts);
  }

  customCategoryCount(): number {
    return this.restoreData()?.categories.filter((c) => !c.is_predefined).length ?? 0;
  }

  async executeRestore(): Promise<void> {
    const data = this.restoreData();
    if (!data || this.restoring()) return;
    this.restoring.set(true);
    try {
      const result = await this.restoreService.restore(data, this.restoreOptions());
      const detail = [
        result.categories > 0 ? `Categorías: ${result.categories}` : '',
        result.accounts > 0 ? `Cuentas: ${result.accounts}` : '',
        result.transactions > 0 ? `Transacciones: ${result.transactions}` : '',
        result.budgets > 0 ? `Presupuestos: ${result.budgets}` : '',
        result.transfers > 0 ? `Transferencias: ${result.transfers}` : '',
      ]
        .filter(Boolean)
        .join(', ');
      const skippedInfo = [
        result.skipped.noCategory > 0 ? `sin categoría: ${result.skipped.noCategory}` : '',
        result.skipped.recurrenceLinked > 0
          ? `recurrentes: ${result.skipped.recurrenceLinked}`
          : '',
        result.skipped.txError > 0 ? `errores: ${result.skipped.txError}` : '',
        result.skipped.transferNoAccount > 0
          ? `transf. sin cuenta: ${result.skipped.transferNoAccount}`
          : '',
      ]
        .filter(Boolean)
        .join(', ');
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('settings.data.restoredToast'),
        detail: detail + (skippedInfo ? ` | Omitidas: ${skippedInfo}` : ''),
        life: 10000,
      });
      this.restoreDialogOpen.set(false);
      await this.accounts.refresh();
    } catch (e) {
      console.error('Restore error:', e);
      this.message.add({
        severity: 'error',
        summary: this.translate.instant('settings.data.restoreError'),
        life: 6000,
      });
    } finally {
      this.restoring.set(false);
    }
  }
}
