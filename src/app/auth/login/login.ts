import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
  ],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly submitting = signal(false);
  readonly googleLoading = signal(false);
  readonly error = signal<string | null>(null);

  async signInWithGoogle(): Promise<void> {
    if (this.googleLoading()) return;
    this.googleLoading.set(true);
    this.error.set(null);
    try {
      await this.auth.signInWithGoogle();
      // Page will redirect to Google — no further action needed here
    } catch {
      this.error.set('auth.errors.generic');
      this.googleLoading.set(false);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);
    this.error.set(null);
    try {
      const { email, password } = this.form.getRawValue();
      await this.auth.signIn(email, password);
      await this.router.navigateByUrl('/app/home');
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'auth.errors.generic');
    } finally {
      this.submitting.set(false);
    }
  }
}
