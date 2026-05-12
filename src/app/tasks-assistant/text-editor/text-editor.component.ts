import {Component, inject, OnInit, signal} from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {AsyncPipe, NgIf} from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TextInputComponent} from '../text-input/text-input.component';
import {GrammarOptionsService} from '../services/grammar-options.service';
import {AssistantService} from '../services/assistant.service';
import {
  AdjectiveConditionKey,
  BaseText,
  ExerciseConditionOption,
  ExercisePreviewResult,
  ExerciseRequestDto,
  ExerciseType,
  GapTextType,
  NounConditionKey,
  TaskCardOption,
  VerbConditionKey
} from '../../types/editor.interface';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {PreviewExerciseComponent} from './preview-exercise/preview-exercise.component';

@Component({
  selector: 'dl-text-editor',
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatError,
    MatInput,
    NgIf,
    MatAccordion,
    MatButtonModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    TextInputComponent,
    AsyncPipe,
    MatMenuModule,
    MatCardModule,
    PreviewExerciseComponent,
  ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent implements OnInit{
  private fb =  inject(NonNullableFormBuilder);
  private grammarOptions = inject(GrammarOptionsService);
  private assistantService = inject(AssistantService);

  generatedTasks = signal<ExercisePreviewResult | null>(null);
  rawText = new FormControl('', {nonNullable:true});
  wordList = new FormControl('');
  textlist$ = this.assistantService.getTexts();
  selectedTaskCards: ExerciseType[] = [];
  selectedGapOptions: GapTextType[] = [];
  selectedVerbCondition: VerbConditionKey | null = null;
  selectedAdjectiveCondition: AdjectiveConditionKey | null = null;
  selectedNounCondition: NounConditionKey | null = null;

  readonly taskOptions: TaskCardOption[] = [
    {id: 'gap_text', label: $localize`:@@taskCardGapTextLabel:Lückentext`},
    {id: 'word_definition', label: $localize`:@@taskCardWordDefinitionLabel:Wortdefinition`},
    {id: 'true_false', label: $localize`:@@taskCardTrueFalseLabel:Richtig/Falsch-Aussage`},
    {id: 'question_answer', label: $localize`:@@taskCardQuestionAnswerLabel:Frage Antwort`},
    {id: 'translate', label: $localize`:@@taskCardTranslationLabel:Übersetzung`},
  ];
  readonly gapOptions: ExerciseConditionOption<GapTextType>[] = [
    {id: 'wordList', label: $localize`:@@gapOptionWordListLabel:Lücken für ausgewählte Wörter aus dem Text`},
    {id: 'verb', label: $localize`:@@gapOptionVerbLabel:Lücken anstelle von Verben`},
    {id: 'adjective', label: $localize`:@@gapOptionAdjectiveLabel:Lücken anstelle von Adjektiven`},
    {id: 'noun', label: $localize`:@@gapOptionNounLabel:Lücken anstelle von Nomen`},
  ];
  readonly verbConditions: ExerciseConditionOption<VerbConditionKey>[] = [
    {id: 'verbForm', label: $localize`:@@grammarVerbFormLabel:Vollverb`},
    {id: 'modalVerb', label: $localize`:@@grammarModalVerbLabel:Modalverb`},
    {id: 'modus', label: $localize`:@@grammarModusLabel:Modus`},
    {id: 'kasus', label: $localize`:@@grammarCaseLabel:Kasus`},
    {id: 'activeForm', label: $localize`:@@grammarFormLabel:Form`},
  ];
  readonly adjectiveConditions: ExerciseConditionOption<AdjectiveConditionKey>[] = [
    {id: 'article', label: $localize`:@@grammarArticleLabel:Artikel`},
    {id: 'kasus', label: $localize`:@@grammarCaseLabel:Kasus`},
    {id: 'comparison', label: $localize`:@@grammarComparisonLabel:Steigerungsform`},
  ];
  readonly nounConditions: ExerciseConditionOption<NounConditionKey>[] = [
    {id: 'article', label: $localize`:@@grammarArticleLabel:Artikel`},
    {id: 'kasus', label: $localize`:@@grammarCaseLabel:Kasus`},
  ];

  taskListForm = this.fb.group({
    gap_text: false,
    true_false: false,
    translate: false,
    question_answer: false,
    word_definition: false
  });
  gapTextForm = this.fb.group({
    selectedType: this.fb.control<GapTextType[]>([]),
    adjective: this.fb.group({
      article: [],
      kasus: [],
      comparison: []
    }),
    noun: this.fb.group({
      article: [],
      kasus: [],
    }),
    verb: this.fb.group({
      verbForm: [],
      modalVerb: [],
      kasus: [],
      modus: [],
      activeForm: [],
    }),
    preposition: this.fb.group({
      type: [],
      kasus: [],
    })
  });
  truFalForm = this.fb.group({
    count: null
  });
  quAnForm = this.fb.group({
    count: null,
  }) ;
  translateForm = this.fb.group({
    count: null,
  });

  kasus = this.grammarOptions.kasus;
  article = this.grammarOptions.article;
  comparisons = this.grammarOptions.comparisons;
  verbForm = this.grammarOptions.verbForm;
  modalsVerbs = this.grammarOptions.modalsVerbs;
  modus = this.grammarOptions.modus;
  formTypes = this.grammarOptions.formTypes;

  constructor(

  ) {
  }

  ngOnInit() {
    this.assistantService.getTexts().subscribe(res => {
    })
  }

  submit(): void {
    const taskList = this.taskListForm.getRawValue();
    const body: ExerciseRequestDto = {
      text: this.rawText.value
    };
    if (taskList.gap_text) {
      body['gap_text'] = {wordList: this.wordList?.value, ...this.gapTextForm.getRawValue()};
    }
    if (taskList.true_false) {
      body['true_false'] = {count: this.truFalForm.get('count')?.value || 0};
    }
    if (taskList.question_answer) {
      body['question_answer'] = {count: this.quAnForm.get('count')?.value || 0};
    }
    if (taskList.translate) {
      body['translate'] = {count: this.translateForm.get('count')?.value || 0};
    }
    if (taskList.word_definition) {
      body['word_definition'] = {wordList: this.wordList?.value};
    }
    this.assistantService.generateTasks(body).subscribe(res => {
      this.generatedTasks.set(res);
    })
  }

  setText(data: BaseText): void {
    this.rawText.setValue(data.text);
  }

  addSelectedWords(word: string): void {
    const newValue = this.wordList?.value ? `${this.wordList.value}, ${word}` : word;
    this.wordList.setValue(newValue);
  }

  addTaskCard(type: ExerciseType): void {
    if (this.selectedTaskCards.includes(type)) {
      return;
    }

    this.selectedTaskCards = [...this.selectedTaskCards, type];
    this.taskListForm.get(type)?.setValue(true);
  }

  removeTaskCard(type: ExerciseType): void {
    this.selectedTaskCards = this.selectedTaskCards.filter(item => item !== type);
    this.taskListForm.get(type)?.setValue(false);

    if (type === 'gap_text') {
      this.selectedGapOptions = [];
      this.selectedVerbCondition = null;
      this.selectedAdjectiveCondition = null;
      this.selectedNounCondition = null;
      this.gapTextForm.reset({selectedType: []});
    }
  }

  isTaskCardSelected(type: ExerciseType): boolean {
    return this.selectedTaskCards.includes(type);
  }

  getTaskLabel(type: ExerciseType): string {
    return this.taskOptions.find(item => item.id === type)?.label || type;
  }

  selectGapOption(option: GapTextType): void {
    if (this.selectedGapOptions[0] === option) {
      return;
    }

    this.clearSelectedGapControls();
    this.selectedGapOptions = [option];
    this.syncSelectedGapOptions();
  }

  removeGapOption(option: GapTextType): void {
    this.selectedGapOptions = this.selectedGapOptions.filter(item => item !== option);
    this.clearSelectedGapControls();
    this.syncSelectedGapOptions();
  }

  isGapOptionSelected(option: GapTextType): boolean {
    return this.selectedGapOptions.includes(option);
  }

  getGapOptionLabel(option: GapTextType): string {
    return this.gapOptions.find(item => item.id === option)?.label || option;
  }

  selectVerbCondition(condition: VerbConditionKey): void {
    this.selectedVerbCondition = condition;
    this.resetControlsExcept(this.gapTextForm.controls.verb.controls, condition);
  }

  selectAdjectiveCondition(condition: AdjectiveConditionKey): void {
    this.selectedAdjectiveCondition = condition;
    this.resetControlsExcept(this.gapTextForm.controls.adjective.controls, condition);
  }

  selectNounCondition(condition: NounConditionKey): void {
    this.selectedNounCondition = condition;
    this.resetControlsExcept(this.gapTextForm.controls.noun.controls, condition);
  }

  private syncSelectedGapOptions(): void {
    this.gapTextForm.controls.selectedType.setValue(this.selectedGapOptions);
  }

  private clearSelectedGapControls(): void {
    this.selectedVerbCondition = null;
    this.selectedAdjectiveCondition = null;
    this.selectedNounCondition = null;
    this.gapTextForm.controls.verb.reset();
    this.gapTextForm.controls.adjective.reset();
    this.gapTextForm.controls.noun.reset();
  }

  private resetControlsExcept(controls: Record<string, FormControl>, activeControl: string): void {
    Object.entries(controls).forEach(([key, control]) => {
      if (key !== activeControl) {
        control.reset();
      }
    });
  }
}
