import {Component, Input} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SettingsForm} from '../../types/editor.interface';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

@Component({
  selector: 'dl-editor-settings',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    ReactiveFormsModule,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanel,
  ],
  templateUrl: './editor-settings.component.html',
  styleUrl: './editor-settings.component.scss'
})
export class EditorSettingsComponent {

  @Input() settingsForm!: FormGroup<SettingsForm>;

  optionsList = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4'
  ];

  countList = [5, 7, 10, 15];

  languageLevelList = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  taskTypesList = [
    {
      id: 1,
      description: 'Generate new sentences using source words.'
    },
    {
      id: 2,
      description: 'Provide definitions of the source words.'
    },
    {
      id: 3,
      description: 'Create True/False statements.'
    },
    {
      id: 4,
      description: 'Generate questions to the text.'
    },
    {
      id: 5,
      description: 'Generate sentences for translation.'
    }
  ];

  test() {
    console.log(this.settingsForm.value);
  }
}
