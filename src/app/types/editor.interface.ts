import {FormControl, FormGroup} from '@angular/forms';

export interface SettingsForm {
  language: FormControl<string | null>;
  languageLevel: FormControl<string | null>;
  count: FormControl<number | null>;
  autogenerateText: FormControl<boolean>;
  tenses: FormControl<string[] | null>;
  activeForm: FormControl<string[] | null>;
  konjunktiv: FormControl<string[] | null>;
  helperVerbs: FormControl<string[] | null>;
  deklination: FormControl<string[] | null>;
  kasus: FormControl<string[] | null>;
  taskType: FormControl<string[] | null>;
}

export interface GapTextForm {
  selectedType: FormControl<string | null>;
  wordList: FormControl<string>;
  adjective: FormGroup<{
    article: FormControl<string | null>;
    kasus: FormControl<string | null>;
    comparison: FormControl<string | null>;
  }>;
  noun: FormGroup<{
    article: FormControl<string | null>;
    kasus: FormControl<string | null>;
  }>;
  verb: FormGroup<{
    verbForm: FormControl<string | null>;
    modalVerb: FormControl<string | null>;
    kasus: FormControl<string | null>;
    modus: FormControl<string | null>;
    activeForm: FormControl<string | null>;
  }>;
  preposition: FormGroup<{
    type: FormControl<string | null>;
    kasus: FormControl<string | null>;
  }>;
}

export interface TaskTypeForm {
  [key: string]: FormControl<string | null>;
}

export interface TaskType {
  id: string;
  description: string;
  name: string;
}

export interface TaskRequest {
  message: TaskOptions;
}

export interface TaskOptions {
  language: string;
  languageLevel: string;
  count: number;
  autogenerateText: boolean;
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

export interface GeneratedResponse {
  sourceWords: string[];
  outputTasks: { id: string, value: any }[];
}

export interface BaseText {
  id: string;
  name: string;
  text: string;
}
