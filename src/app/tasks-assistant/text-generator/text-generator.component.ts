import {Component, OnInit} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {TextGeneratorApiService} from '../../common-services/api-services/text-generator-api.service';

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
    MatDivider,
    MatButton
  ],
  templateUrl: './text-generator.component.html',
  styleUrl: './text-generator.component.scss'
})
export class TextGeneratorComponent implements OnInit {
  textGeneratorForm!: UntypedFormGroup;
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
    {article: 'definite', title: 'bestimte Artikle'},
    {article: 'indefinite', title: 'unbestimte Artikle'},
    {article: 'no_article', title: 'ohne Artikele'},
  ];
  comparisons = [
    {comparison: 'positive', title: 'Positiv'},
    {comparison: 'comparative', title: 'Komparativ'},
    {comparison: 'superlative', title: 'Superlativ'},
  ];
  verbForm = ['regelmäßig', 'unregelmäßig', 'trennbaren', 'transitive', 'intransitive', 'reflexive'];
  modalsVerbs = ['dürfen', 'können', 'mögen', 'müssen', 'sollen', 'wollen'];
  modus = ['Indikativ', 'Konjunktiv I', 'Konjunktiv II', 'Imperativ'];
  prepositionsType = ['kausale', 'lokale', 'temporale', 'modale', 'wechselpräpositionen'];
  typeOfSentences = ['Einfache Sätze', 'Komplexe Sätze', 'W-Fragen Sätze', 'Ja/Nein Fragen Sätze', 'Imperative Sätze'];
  konnektoren = ['und', 'oder', 'aber', 'denn', 'weil', 'obwohl', 'wenn', 'damit', 'trotzdem', 'deshalb'];
  doppelKonnektoren = ['sowohl ... als auch', 'entweder ... oder', 'nicht nur ... sondern auch', 'weder ... noch', 'je ... desto', 'einerseits ... andererseits'];

  constructor(
    private fb: FormBuilder,
    private textGeneratorApi: TextGeneratorApiService,
  ) {
  }

  ngOnInit() {
    this.textGeneratorForm = this.fb.group({
      language: ['German'],
      languageLevel: ['B2'],
      count: [10],
      sourceWords: [null, Validators.required],
      context: [null, Validators.required],
      textType: ['text'],
      tens: ['Präsens'],
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
    })
  }

  submit() {
    const formData = this.textGeneratorForm.getRawValue();
    this.textGeneratorApi.generateText_V2(formData).subscribe(res => {
      console.log('Response from API:', res);
      // Handle the response as needed
    });
  }
}
