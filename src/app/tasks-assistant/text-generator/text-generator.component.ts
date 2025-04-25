import {Component, DestroyRef, inject, OnInit, Signal, signal, viewChild} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {MatButton} from '@angular/material/button';
import {TextGeneratorApiService} from '../../common-services/api-services/text-generator-api.service';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {GrammarOptionsService} from '../services/grammar-options.service';

@Component({
  selector: 'dl-text-generator',
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    ReactiveFormsModule,
    MatButton,
    MatExpansionPanelDescription,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion,
    MatIcon,
  ],
  templateUrl: './text-generator.component.html',
  styleUrl: './text-generator.component.scss'
})
export class TextGeneratorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private grammarOptions = inject(GrammarOptionsService);
  textGeneratorForm: UntypedFormGroup = this.fb.group({
    language: [],
    languageLevel: [],
    count: [],
    sourceWords: [null, Validators.required],
    context: [null, Validators.required],
    textType: [],
    tens: [],
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
    }),
    sentences: this.fb.group({
      type: [],
      konnektor: [],
      doppelKonnektor: [],
    })
  });
  resultForm = this.fb.group({
    textName: ['', Validators.required],
    textResult: ['', Validators.required],
  });
  languageLevelList = this.grammarOptions.languageLevelList;
  textTypes = this.grammarOptions.textTypes;
  tenses = this.grammarOptions.tenses;
  formTypes = this.grammarOptions.formTypes;
  kasus = this.grammarOptions.kasus;
  article = this.grammarOptions.article;
  comparisons = this.grammarOptions.comparisons;
  verbForm = this.grammarOptions.verbForm;
  modalsVerbs = this.grammarOptions.modalsVerbs;
  modus = this.grammarOptions.modus;
  prepositionsType = this.grammarOptions.prepositionsType;
  typeOfSentences = this.grammarOptions.typeOfSentences;
  konnektoren = this.grammarOptions.konnektoren;
  doppelKonnektoren = this.grammarOptions.doppelKonnektoren;

  sourceFormValue = {
    language: 'German',
    languageLevel: 'B2',
    count: 10,
    textType: 'text',
    tens: 'Präsens',
  };
  accordion: Signal<MatAccordion> = viewChild.required(MatAccordion);
  readonly formValue: any = signal(null);
  generatedResult = signal('');

  constructor(
    private textGeneratorApi: TextGeneratorApiService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.textGeneratorForm.patchValue(this.sourceFormValue);
    this.formValue.set(this.sourceFormValue);
    this.textGeneratorForm.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(value => {
        this.formValue.set(value);
      })
    ).subscribe();
  }

  submit() {
    this.accordion().closeAll();
    const formData = this.textGeneratorForm.getRawValue();
    this.textGeneratorApi.generateText_V2(formData).pipe(
      tap((res: {text: string}) => {
        this.generatedResult.set(res.text);
        this.resultForm.get('textResult')?.setValue(res.text);
      }),
    ).subscribe();
  }

  passTextToEditor() {
    this.saveText().subscribe(() => {
      this.router.navigate(['/task-assistant/task-editor'])
    });
  }

  saveTextAction() {
    this.saveText().subscribe();
  }

  saveText() {
    const formData = this.textGeneratorForm.getRawValue();
    const text = this.resultForm.getRawValue();
    const params = {
      name: text.textName,
      text: text.textResult,
      language: formData.language,
      languageLevel: formData.languageLevel,
      count: formData.count,
      sourceWords: formData.sourceWords,
      textType:  formData.textType,
      tens: formData.tens,
    };
    return this.textGeneratorApi.saveText(params);
  }
}
