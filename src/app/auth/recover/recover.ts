import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-recover',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
  ],
  templateUrl: './recover.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Recover {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal(false);

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);
    this.error.set(null);
    try {
      const { email } = this.form.getRawValue();
      const redirectTo = `${window.location.origin}/auth/reset`;
      await this.auth.sendPasswordReset(email, redirectTo);
      this.success.set(true);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'auth.errors.generic');
    } finally {
      this.submitting.set(false);
    }
  }
}
