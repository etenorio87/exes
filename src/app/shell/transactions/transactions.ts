import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-transactions',
  imports: [TranslateModule],
  template: `
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-50">
        {{ 'shell.nav.transactions' | translate }}
      </h1>
      <p class="text-surface-600 dark:text-surface-400">
        {{ 'shell.placeholder' | translate }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Transactions {}
