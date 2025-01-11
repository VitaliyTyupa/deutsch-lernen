import { Component } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatCheckbox} from '@angular/material/checkbox';

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
  ],
  templateUrl: './editor-settings.component.html',
  styleUrl: './editor-settings.component.scss'
})
export class EditorSettingsComponent {

  optionsList = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4'
  ];

}
