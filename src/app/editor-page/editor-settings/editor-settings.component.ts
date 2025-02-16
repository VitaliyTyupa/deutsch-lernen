import {ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SettingsForm} from '../../types/editor.interface';
import {TaskOptionsService} from '../services/task-options.service';
import {NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'dl-editor-settings',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatRadioGroup,
    MatRadioButton,
    ReactiveFormsModule,
    MatError,
    NgIf,
  ],
  templateUrl: './editor-settings.component.html',
  styleUrl: './editor-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditorSettingsComponent implements OnInit{

  @Input() settingsForm!: FormGroup<SettingsForm>;
  private destroyRef = inject(DestroyRef);
  private taskOptionsService = inject(TaskOptionsService);
  private toastr = inject(ToastrService);

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

  helperVerbs = [
    'sein',
    'haben',
    'werden'
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

  deklinationTypes = [
    'unbestimmter Artikel',
    'bestimmter Artikel',
    'Possessivpronomen',
    'Personalpronomen',
    'Demonstrativpronomen',
    'Relativpronomen',
    'Interrogativpronomen',
    'Indefinitpronomen',
    'Reflexivpronomen',
    'Negationspronomen',
    'Präpositionen',
    'Adjektive',
    'Zahlwörter',
    'Substantive',
    'Nomen',
    'Pronomen',
    'Artikel',
    'Adjektiv',
    'Verb',
    'Präposition',
    'Konjunktion',
    'Adverb',
    'Interjektion',
    'Partikel',
    'Numerale',
    'Pronominaladverb',
    'Pronominaladverbien',
    ];




  countList = [5, 7, 10, 15];

  languageLevelList = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  taskTypesList = this.taskOptionsService.getTaskTypesList();

  ngOnInit() {
  }

}
