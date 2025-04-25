import {Component, inject, OnInit} from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDivider} from '@angular/material/divider';
import {TextInputComponent} from '../text-input/text-input.component';
import {GrammarOptionsService} from '../services/grammar-options.service';

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
    MatDivider
  ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent implements OnInit{
  private fb =  inject(NonNullableFormBuilder);
  private grammarOptions = inject(GrammarOptionsService);
  rawText = new FormControl('', {nonNullable:true});
  gapTextForm = this.fb.group({
    wordList: [''],
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
  kasus = this.grammarOptions.kasus;
  article = this.grammarOptions.article;
  comparisons = this.grammarOptions.comparisons;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  submit() {

  }

  addSelectedWords(word: string) {
    const sourceWordField = this.gapTextForm.get('wordList');
    const newValue = sourceWordField?.value ? `${sourceWordField.value}, ${word}` : word;
    this.gapTextForm.get('wordList')?.setValue(newValue);
  }

}
