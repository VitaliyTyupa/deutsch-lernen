import {Component, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {GrammarOptionsService} from '../../services/grammar-options.service';
import {AssistantService} from '../../services/assistant.service';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatSelect} from '@angular/material/select';
import {NgIf} from '@angular/common';

@Component({
  selector: 'dl-gap-text-tab',
  imports: [
    MatAccordion,
    MatError,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatRadioButton,
    MatRadioGroup,
    MatSelect,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './gap-text-tab.component.html',
  styleUrl: './gap-text-tab.component.scss'
})
export class GapTextTabComponent {
  private fb =  inject(NonNullableFormBuilder);
  private grammarOptions = inject(GrammarOptionsService);
  private assistantService = inject(AssistantService);
  gapTextForm = this.fb.group({
    selectedType: [],
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
  verbForm = this.grammarOptions.verbForm;
  modalsVerbs = this.grammarOptions.modalsVerbs;
  modus = this.grammarOptions.modus;
  formTypes = this.grammarOptions.formTypes;

}
