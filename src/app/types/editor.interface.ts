import {FormControl} from '@angular/forms';

export interface SettingsForm {
  language: FormControl<string | null>;
  languageLevel: FormControl<string | null>;
  count: FormControl<number | null>;
  autogenerateText: FormControl<boolean | null>;
  showAnswer: FormControl<boolean | null>;
}
