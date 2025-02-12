import {ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SettingsForm} from '../../types/editor.interface';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TaskOptionsService} from '../services/task-options.service';
import {NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {MatButton} from '@angular/material/button';
import {PrintService} from '../services/print.service';

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
    MatError,
    NgIf,
    MatButton,
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
  private printService = inject(PrintService);

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
    this.settingsForm.get('autogenerateText')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value) => {
      if (value) {
        this.taskTypesList = this.taskOptionsService.getTaskTypesList('withoutText');
        this.settingsForm.get('taskType')?.reset();
        this.settingsForm.get('context')?.setValidators(Validators.required);
        this.settingsForm.get('text')?.removeValidators(Validators.required);
      } else {
        this.taskTypesList = this.taskOptionsService.getTaskTypesList();
        this.settingsForm.get('taskType')?.reset();
        this.settingsForm.get('text')?.setValidators(Validators.required);
        this.settingsForm.get('context')?.removeValidators(Validators.required);
      }
      this.toastr.info('Bitte beachten Sie, dass die Einstellungen für die Aufgabengenerierung geändert wurden. Bitte wählen Sie mindestens einen Aufgabentyp aus.');
    });
  }

  print() {
    const text = this.settingsForm.get('text')?.value;
    if (text) {
      this.printService.printSelectedTextWithStyles(text);
    } else {
      this.toastr.error('Bitte geben Sie den Text ein, um ihn zu drucken.');
      return
    }

  }
}
