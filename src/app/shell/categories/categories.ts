import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import {
  Category,
  CategoriesService,
  CategoryInput,
  CategoryType,
} from '../../core/categories.service';
import { LanguageService } from '../../core/language.service';

const COLOR_PALETTE = [
  '#10b981', // emerald
  '#3b82f6', // blue
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#d946ef', // fuchsia
  '#ec4899', // pink
  '#14b8a6', // teal
  '#64748b', // slate
] as const;

const ICON_PALETTE = [
  'pi-shopping-cart',
  'pi-car',
  'pi-home',
  'pi-heart',
  'pi-book',
  'pi-bolt',
  'pi-tag',
  'pi-money-bill',
  'pi-briefcase',
  'pi-credit-card',
  'pi-wallet',
  'pi-ticket',
  'pi-globe',
  'pi-gift',
  'pi-mobile',
  'pi-receipt',
] as const;

type FilterValue = 'all' | CategoryType;

@Component({
  selector: 'app-categories',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    SelectButtonModule,
    TagModule,
    TooltipModule,
  ],
  templateUrl: './categories.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categories {
  private readonly fb = inject(FormBuilder);
  private readonly categories = inject(CategoriesService);
  private readonly translate = inject(TranslateService);
  private readonly lang = inject(LanguageService);
  private readonly confirm = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  readonly colors = COLOR_PALETTE;
  readonly icons = ICON_PALETTE;

  readonly filter = signal<FilterValue>('all');

  constructor() {
    const pageTitle = inject(Title);
    effect(() => {
      this.lang.current();
      pageTitle.setTitle(`EXES — ${this.translate.instant('categories.title')}`);
    });
  }

  readonly filterOptions = computed(() => {
    // Depend on the language signal so labels re-translate on lang change.
    this.lang.current();
    return [
      { label: this.translate.instant('common.all'), value: 'all' as const },
      { label: this.translate.instant('categories.types.income'), value: 'income' as const },
      { label: this.translate.instant('categories.types.expense'), value: 'expense' as const },
      { label: this.translate.instant('categories.types.both'), value: 'both' as const },
    ];
  });

  readonly typeOptions = computed(() =>
    (['income', 'expense', 'both'] as CategoryType[]).map((type) => ({
      label: this.categories.typeLabel(type),
      value: type,
    })),
  );

  readonly visible = computed<Category[]>(() => {
    const f = this.filter();
    const all = this.categories.all();
    if (f === 'all') return all;
    return all.filter((c) => c.type === f || c.type === 'both');
  });

  // ─── Dialog state ─────────────────────────────────────────────────────────
  readonly dialogOpen = signal(false);
  readonly editing = signal<Category | null>(null);
  readonly saving = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    type: ['expense' as CategoryType, [Validators.required]],
    color: [COLOR_PALETTE[0] as string],
    icon: [ICON_PALETTE[0] as string],
  });

  // ─── Actions ──────────────────────────────────────────────────────────────
  openCreate(): void {
    this.editing.set(null);
    this.form.reset({
      name: '',
      type: 'expense',
      color: COLOR_PALETTE[0],
      icon: ICON_PALETTE[0],
    });
    this.dialogOpen.set(true);
  }

  openEdit(cat: Category): void {
    if (cat.is_predefined) return;
    this.editing.set(cat);
    this.form.reset({
      name: cat.name,
      type: cat.type,
      color: cat.color ?? COLOR_PALETTE[0],
      icon: cat.icon ?? ICON_PALETTE[0],
    });
    this.dialogOpen.set(true);
  }

  closeDialog(): void {
    this.dialogOpen.set(false);
  }

  async save(): Promise<void> {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);
    const input: CategoryInput = this.form.getRawValue();
    try {
      const editing = this.editing();
      if (editing) {
        await this.categories.update(editing.id, input);
      } else {
        await this.categories.create(input);
      }
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('categories.savedToast'),
      });
      this.dialogOpen.set(false);
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      const detail =
        code === '23505'
          ? this.translate.instant('categories.errors.duplicateName')
          : this.translate.instant('categories.errors.generic');
      this.message.add({ severity: 'error', summary: detail, life: 6000 });
    } finally {
      this.saving.set(false);
    }
  }

  confirmDelete(cat: Category): void {
    if (cat.is_predefined) return;
    this.confirm.confirm({
      message: this.translate.instant('categories.deleteConfirm', { name: cat.name }),
      header: this.translate.instant('common.confirm'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('common.delete'),
      rejectLabel: this.translate.instant('common.cancel'),
      acceptButtonProps: { severity: 'danger' },
      accept: () => void this.doDelete(cat),
    });
  }

  private async doDelete(cat: Category): Promise<void> {
    try {
      await this.categories.softDelete(cat.id);
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('categories.deletedToast'),
      });
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      const detail =
        code === '23503'
          ? this.translate.instant('categories.errors.cannotDeleteInUse')
          : this.translate.instant('categories.errors.generic');
      this.message.add({ severity: 'error', summary: detail, life: 6000 });
    }
  }

  // Helpers used from template
  displayName(cat: Category): string {
    return this.categories.displayName(cat);
  }
  typeLabel(type: CategoryType): string {
    return this.categories.typeLabel(type);
  }
  typeSeverity(type: CategoryType): 'success' | 'warn' | 'info' {
    return type === 'income' ? 'success' : type === 'expense' ? 'warn' : 'info';
  }
  selectColor(color: string): void {
    this.form.controls.color.setValue(color);
  }
  selectIcon(icon: string): void {
    this.form.controls.icon.setValue(icon);
  }
}
