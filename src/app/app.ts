import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/language.service';
import { UserPreferencesService } from './core/user-preferences.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly _lang = inject(LanguageService);
  // Eagerly construct so the theme effect applies .app-dark from boot.
  private readonly _prefs = inject(UserPreferencesService);
}
