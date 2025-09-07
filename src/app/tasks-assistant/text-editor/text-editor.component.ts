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
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDivider} from '@angular/material/divider';
import {TextInputComponent} from '../text-input/text-input.component';
import {GrammarOptionsService} from '../services/grammar-options.service';
import {AssistantService} from '../services/assistant.service';
import {BaseText} from '../../types/editor.interface';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {ContentPreviewComponent} from '../../editor-page/content-preview/content-preview.component';

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
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    TextInputComponent,
    MatCheckbox,
    MatDivider,
    AsyncPipe,
    MatRadioGroup,
    MatRadioButton,
    MatExpansionPanelDescription,
    MatTabGroup,
    MatTab,
    ContentPreviewComponent
  ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent implements OnInit{
  private fb =  inject(NonNullableFormBuilder);
  private grammarOptions = inject(GrammarOptionsService);
  private assistantService = inject(AssistantService);

  generatedTasks: any = signal([]);
  rawText = new FormControl('', {nonNullable:true});
  wordList = new FormControl('');
  textlist$ = this.assistantService.getTexts();
  taskListForm = this.fb.group({
    gap_text: false,
    true_false: false,
    translate: false,
    question_answer: false,
    word_definition: false
  });
  gapTextForm = this.fb.group({
    selectedType: [],
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
      console.log(res);
    })
  }

  setText(data: BaseText) {
    this.rawText.setValue(data.text);
  }

  addSelectedWords(word: string) {
    const newValue = this.wordList?.value ? `${this.wordList.value}, ${word}` : word;
    this.wordList.setValue(newValue);
  }

}
