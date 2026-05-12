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
import {BaseText} from '../../types/editor.interface';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {
  ExercisePreviewResult,
  PreviewExerciseComponent
} from './preview-exercise/preview-exercise.component';

type TaskCardType = 'gap_text' | 'word_definition' | 'true_false' | 'question_answer' | 'translate';
type GapOptionType = 'wordList' | 'verb' | 'adjective' | 'noun';
type VerbCondition = 'verbForm' | 'modalVerb' | 'modus' | 'kasus' | 'activeForm';
type AdjectiveCondition = 'article' | 'kasus' | 'comparison';
type NounCondition = 'article' | 'kasus';

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
  selectedTaskCards: TaskCardType[] = [];
  selectedGapOptions: GapOptionType[] = [];
  selectedVerbCondition: VerbCondition | null = null;
  selectedAdjectiveCondition: AdjectiveCondition | null = null;
  selectedNounCondition: NounCondition | null = null;

  readonly taskOptions: { id: TaskCardType; label: string }[] = [
    {id: 'gap_text', label: 'Lückentext'},
    {id: 'word_definition', label: 'Wortdefinition'},
    {id: 'true_false', label: 'Richtig/Falsch-Aussage'},
    {id: 'question_answer', label: 'Frage Antwort'},
    {id: 'translate', label: 'Übersetzung'},
  ];
  readonly gapOptions: { id: GapOptionType; label: string }[] = [
    {id: 'wordList', label: 'Пропуски вибраних слів з тексту'},
    {id: 'verb', label: 'Пропуски замість дієслів'},
    {id: 'adjective', label: 'Пропуски замість прикметників'},
    {id: 'noun', label: 'Пропуски замість іменників'},
  ];
  readonly verbConditions: { id: VerbCondition; label: string }[] = [
    {id: 'verbForm', label: 'Vollverb'},
    {id: 'modalVerb', label: 'Modalverb'},
    {id: 'modus', label: 'Modus'},
    {id: 'kasus', label: 'Kasus'},
    {id: 'activeForm', label: 'Form'},
  ];
  readonly adjectiveConditions: { id: AdjectiveCondition; label: string }[] = [
    {id: 'article', label: 'Artikel'},
    {id: 'kasus', label: 'Kasus'},
    {id: 'comparison', label: 'Steigerungsform'},
  ];
  readonly nounConditions: { id: NounCondition; label: string }[] = [
    {id: 'article', label: 'Artikel'},
    {id: 'kasus', label: 'Kasus'},
  ];

  taskListForm = this.fb.group({
    gap_text: false,
    true_false: false,
    translate: false,
    question_answer: false,
    word_definition: false
  });
  gapTextForm = this.fb.group({
    selectedType: this.fb.control<GapOptionType[]>([]),
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

  submit() {
    const taskList = this.taskListForm.getRawValue();
    const body: any = {
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

  setText(data: BaseText) {
    this.rawText.setValue(data.text);
  }

  addSelectedWords(word: string) {
    const newValue = this.wordList?.value ? `${this.wordList.value}, ${word}` : word;
    this.wordList.setValue(newValue);
  }

  addTaskCard(type: TaskCardType) {
    if (this.selectedTaskCards.includes(type)) {
      return;
    }

    this.selectedTaskCards = [...this.selectedTaskCards, type];
    this.taskListForm.get(type)?.setValue(true);
  }

  removeTaskCard(type: TaskCardType) {
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

  isTaskCardSelected(type: TaskCardType): boolean {
    return this.selectedTaskCards.includes(type);
  }

  getTaskLabel(type: TaskCardType): string {
    return this.taskOptions.find(item => item.id === type)?.label || type;
  }

  selectGapOption(option: GapOptionType) {
    if (this.selectedGapOptions[0] === option) {
      return;
    }

    this.clearSelectedGapControls();
    this.selectedGapOptions = [option];
    this.syncSelectedGapOptions();
  }

  removeGapOption(option: GapOptionType) {
    this.selectedGapOptions = this.selectedGapOptions.filter(item => item !== option);
    this.clearSelectedGapControls();
    this.syncSelectedGapOptions();
  }

  isGapOptionSelected(option: GapOptionType): boolean {
    return this.selectedGapOptions.includes(option);
  }

  getGapOptionLabel(option: GapOptionType): string {
    return this.gapOptions.find(item => item.id === option)?.label || option;
  }

  selectVerbCondition(condition: VerbCondition) {
    this.selectedVerbCondition = condition;
    this.resetControlsExcept(this.gapTextForm.controls.verb.controls, condition);
  }

  selectAdjectiveCondition(condition: AdjectiveCondition) {
    this.selectedAdjectiveCondition = condition;
    this.resetControlsExcept(this.gapTextForm.controls.adjective.controls, condition);
  }

  selectNounCondition(condition: NounCondition) {
    this.selectedNounCondition = condition;
    this.resetControlsExcept(this.gapTextForm.controls.noun.controls, condition);
  }

  private syncSelectedGapOptions() {
    this.gapTextForm.controls.selectedType.setValue(this.selectedGapOptions);
  }

  private clearSelectedGapControls() {
    this.selectedVerbCondition = null;
    this.selectedAdjectiveCondition = null;
    this.selectedNounCondition = null;
    this.gapTextForm.controls.verb.reset();
    this.gapTextForm.controls.adjective.reset();
    this.gapTextForm.controls.noun.reset();
  }

  private resetControlsExcept(controls: Record<string, FormControl>, activeControl: string) {
    Object.entries(controls).forEach(([key, control]) => {
      if (key !== activeControl) {
        control.reset();
      }
    });
  }
}
