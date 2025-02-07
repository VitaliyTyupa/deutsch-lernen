import {FormControl} from '@angular/forms';

export interface SettingsForm {
  language: FormControl<string | null>;
  languageLevel: FormControl<string | null>;
  count: FormControl<number | null>;
  autogenerateText: FormControl<boolean>;
  showAnswer: FormControl<boolean>;
  tenses: FormControl<string[] | null>;
  activeForm: FormControl<string[] | null>;
  konjunktiv: FormControl<string[] | null>;
  helperVerbs: FormControl<string[] | null>;
  deklination: FormControl<string[] | null>;
  kasus: FormControl<string[] | null>;
  taskType: FormControl<string[] | null>;
}

export interface TaskTypeForm {
  [key: string]: FormControl<string | null>;
}

export interface TaskType {
  id: number;
  description: string;
}

export interface TaskRequest {
  message: TaskOptions;
}

export interface TaskOptions {
  language: string;
  languageLevel: string;
  count: number;
  autogenerateText: boolean;
  showAnswer: boolean;
  tenses: string[] | null;
  activeForm: string[] | null;
  konjunktiv: string[] | null;
  helperVerbs: string[] | null;
  deklination: string[] | null;
  kasus: string[] | null;
  taskType: number[];
  context: string;
  sourceWords: string;
  text: string;
}
