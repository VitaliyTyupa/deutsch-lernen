import {Component, DestroyRef, inject, OnInit, Signal, signal, ViewChild, viewChild} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
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
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {QuillEditorComponent} from 'ngx-quill';

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
    MatCardContent,
    MatCardFooter,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    QuillEditorComponent,
  ],
  templateUrl: './text-generator.component.html',
  styleUrl: './text-generator.component.scss'
})
export class TextGeneratorComponent implements OnInit {
  private fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);
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
  languageLevelList = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  textTypes = [
    {type: 'sentences', title: 'Einfache Sätze'},
    {type: 'text', title: 'Kohärenter Text'},
    {type: 'dialog', title: 'Dialog'},
  ];
  tenses = [
    'Präteritum',
    'Perfekt',
    'Plusquamperfekt',
    'Präsens',
    'Futur 1',
    'Futur 2'
  ];
  konjunktiv = [
    'Konjunktiv I',
    'Konjunktiv II'
  ];
  formTypes = [
    'Aktiv',
    'Passiv'
  ];

  kasus = [
    'Nominativ',
    'Genitiv',
    'Dativ',
    'Akkusativ',
    'Plural',
  ];
  article = [
    {article: 'bestimte Artikle', title: 'bestimte Artikle'},
    {article: 'unbestimte Artikle', title: 'unbestimte Artikle'},
    {article: 'ohne Artikele', title: 'ohne Artikele'},
  ];
  comparisons = [
    {comparison: 'Positiv', title: 'Positiv'},
    {comparison: 'Komparativ', title: 'Komparativ'},
    {comparison: 'Superlativ', title: 'Superlativ'},
  ];
  verbForm = ['regelmäßig', 'unregelmäßig', 'trennbaren', 'transitive', 'intransitive', 'reflexive'];
  modalsVerbs = ['dürfen', 'können', 'mögen', 'müssen', 'sollen', 'wollen'];
  modus = ['Indikativ', 'Konjunktiv I', 'Konjunktiv II', 'Imperativ'];
  prepositionsType = ['kausale', 'lokale', 'temporale', 'modale', 'wechselpräpositionen'];
  typeOfSentences = ['Einfache Sätze', 'Komplexe Sätze', 'W-Fragen Sätze', 'Ja/Nein Fragen Sätze', 'Imperative Sätze'];
  konnektoren = ['und', 'oder', 'aber', 'denn', 'weil', 'obwohl', 'wenn', 'damit', 'trotzdem', 'deshalb'];
  doppelKonnektoren = ['sowohl ... als auch', 'entweder ... oder', 'nicht nur ... sondern auch', 'weder ... noch', 'je ... desto', 'einerseits ... andererseits'];
  sourceFormValue = {
    language: 'German',
    languageLevel: 'B2',
    count: 10,
    textType: 'text',
    tens: 'Präsens',
  };
  accordion: Signal<MatAccordion> = viewChild.required(MatAccordion);
  readonly panelOpenState = signal(false);
  readonly formValue: any = signal(null);
  generatedResult = signal('');
  @ViewChild('quillInput') quillInput!: QuillEditorComponent;

  constructor(
    private textGeneratorApi: TextGeneratorApiService,
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
    this.textGeneratorApi.generateText_V2(formData).subscribe((res: any) => {
      this.generatedResult.set(res.text);
      this.quillInput.quillEditor.setText(res.text);
      console.log('Response from API:', res);
    });
  }

  passTextToEditor() {
    const text = this.generatedResult();
    console.log(text);
  }

}
