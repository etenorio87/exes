import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../core/auth.service';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-reset',
  imports: [ReactiveFormsModule, TranslateModule, ButtonModule, PasswordModule, MessageModule],
  templateUrl: './reset.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reset {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatch },
  );

  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal(false);

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);
    this.error.set(null);
    try {
      const { password } = this.form.getRawValue();
      await this.auth.updatePassword(password);
      this.success.set(true);
      // Supabase already created a session via the recovery token, take them in.
      setTimeout(() => void this.router.navigateByUrl('/app/home'), 800);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'auth.errors.generic');
    } finally {
      this.submitting.set(false);
    }
  }
}
