import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Eagerly construct LanguageService so its `effect` starts listening to the
  // auth signal from the moment the app boots.
  private readonly _lang = inject(LanguageService);
}
