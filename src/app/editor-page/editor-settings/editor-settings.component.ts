import {ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SettingsForm} from '../../types/editor.interface';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'dl-editor-settings',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    ReactiveFormsModule,
  ],
  templateUrl: './editor-settings.component.html',
  styleUrl: './editor-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditorSettingsComponent implements OnInit{

  @Input() settingsForm!: FormGroup<SettingsForm>;
  destroyRef = inject(DestroyRef);

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

  taskTypesList = [
    {
      id: 1,
      description: 'Generieren Sie neue Sätze mit Quellwörtern.'
    },
    {
      id: 2,
      description: 'Geben Sie Definitionen der Quellwörter an.'
    },
    {
      id: 3,
      description: 'Erstellen Sie Wahr/Falsch-Aussagen.'
    },
    {
      id: 4,
      description: 'Generieren Sie Fragen zum Text.'
    },
    {
      id: 5,
      description: 'Generieren Sie Sätze zur Übersetzung.'
    }
  ];

  ngOnInit() {
    this.settingsForm.get('autogenerateText')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value) => {
      if (value) {
        this.settingsForm.get('taskType')?.disable()
      } else {
        this.settingsForm.get('taskType')?.enable();
      }
    });
  }

  test() {
    console.log(this.settingsForm.value);
  }
}
