import {Component, DestroyRef, inject, OnInit, Signal, signal, TemplateRef, viewChild} from '@angular/core';
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
import {catchError, tap} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {GrammarOptionsService} from '../services/grammar-options.service';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatChip, MatChipRemove, MatChipSet} from '@angular/material/chips';

type GrammarSectionId = 'adjective' | 'noun' | 'preposition' | 'verb' | 'sentences';

interface GrammarSection {
  id: GrammarSectionId;
  title: string;
}

interface GrammarSummaryItem {
  controlName: string;
  label: string;
}

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
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatChip,
    MatChipRemove,
    MatChipSet,
  ],
  templateUrl: './text-generator.component.html',
  styleUrl: './text-generator.component.scss'
})
export class TextGeneratorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private grammarOptions = inject(GrammarOptionsService);
  private dialog = inject(MatDialog);
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
  readonly grammarSections: GrammarSection[] = [
    {id: 'adjective', title: 'Adjektive'},
    {id: 'noun', title: 'Nomen'},
    {id: 'preposition', title: 'Präpositionen'},
    {id: 'verb', title: 'Verben'},
    {id: 'sentences', title: 'Sätze'},
  ];
  activeGrammarSection = signal<GrammarSection | null>(null);

  sourceFormValue = {
    language: 'German',
    languageLevel: 'B2',
    count: 10,
    textType: 'text',
    tens: 'Präsens',
  };
  readonly formValue: any = signal(null);
  generatedResult = signal('');
  isLoading = signal(false);
  isSavedResult = signal(true);

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
    if (this.textGeneratorForm.invalid) {
      this.textGeneratorForm.markAllAsTouched();
      return;
    }
    const formData = this.textGeneratorForm.getRawValue();
    this.isLoading.set(true);
    this.textGeneratorApi.generateText_V2(formData).pipe(
      tap((res: {text: string}) => {
        this.isLoading.set(false);
        this.generatedResult.set(res.text);
        this.resultForm.get('textResult')?.setValue(res.text);
        this.isSavedResult.set(false);
      }),
      catchError((error) => {
        this.isLoading.set(false);
        return error;
      })
    ).subscribe();
  }

  passTextToEditor() {
    this.saveText().subscribe(() => {
      this.router.navigate(['/task-assistant/task-editor'])
    });
  }

  getGeneratedTextStatus(): string {
    return this.generatedResult()
      ? $localize`:@@textGeneratorDoneStatus:Erledigt`
      : $localize`:@@textGeneratorSetOptionsFirst:Stellen Sie zuerst die Optionen ein`;
  }

  saveTextAction() {
    if(this.isSavedResult()) return;
    this.saveText().subscribe(() => this.isSavedResult.set(true));
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

  openGrammarSection(section: GrammarSection, template: TemplateRef<unknown>): void {
    this.activeGrammarSection.set(section);
    this.dialog.open(template, {
      width: '520px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: false,
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(() => this.activeGrammarSection.set(null))
    ).subscribe();
  }

  getGrammarGroup(sectionId: GrammarSectionId): UntypedFormGroup {
    return this.textGeneratorForm.get(sectionId) as UntypedFormGroup;
  }

  getSectionSummary(sectionId: GrammarSectionId): GrammarSummaryItem[] {
    const value = this.formValue()?.[sectionId] || {};

    switch (sectionId) {
      case 'adjective':
        return [
          value.article ? {controlName: 'article', label: `nach ${value.article}`} : null,
          value.kasus ? {controlName: 'kasus', label: `mit ${value.kasus}`} : null,
          value.comparison ? {controlName: 'comparison', label: value.comparison} : null,
        ].filter((item): item is GrammarSummaryItem => !!item);
      case 'noun':
        return [
          value.article ? {controlName: 'article', label: `mit ${value.article}`} : null,
          value.kasus ? {controlName: 'kasus', label: `in ${value.kasus}`} : null,
        ].filter((item): item is GrammarSummaryItem => !!item);
      case 'preposition':
        return [
          value.type ? {controlName: 'type', label: value.type} : null,
          value.kasus ? {controlName: 'kasus', label: `mit ${value.kasus}`} : null,
        ].filter((item): item is GrammarSummaryItem => !!item);
      case 'verb':
        return [
          value.verbForm ? {controlName: 'verbForm', label: value.verbForm} : null,
          value.modalVerb ? {controlName: 'modalVerb', label: `mit ${value.modalVerb}`} : null,
          value.modus ? {controlName: 'modus', label: `mit ${value.modus}`} : null,
          value.kasus ? {controlName: 'kasus', label: `mit ${value.kasus}`} : null,
          value.activeForm ? {controlName: 'activeForm', label: `in ${value.activeForm}`} : null,
        ].filter((item): item is GrammarSummaryItem => !!item);
      case 'sentences':
        return [
          value.type ? {controlName: 'type', label: value.type} : null,
          value.konnektor ? {controlName: 'konnektor', label: `mit ${value.konnektor}`} : null,
          value.doppelKonnektor ? {controlName: 'doppelKonnektor', label: `mit ${value.doppelKonnektor}`} : null,
        ].filter((item): item is GrammarSummaryItem => !!item);
    }
  }

  removeGrammarOption(event: MouseEvent, sectionId: GrammarSectionId, controlName: string): void {
    event.stopPropagation();
    this.getGrammarGroup(sectionId).get(controlName)?.setValue(null);
  }
}
