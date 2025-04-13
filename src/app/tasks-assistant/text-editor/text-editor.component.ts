import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'dl-text-editor',
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatButtonToggle,
    MatError,
    MatInput,
    NgIf
  ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent implements OnInit{
  textEditorForm!: UntypedFormGroup;
  languageLevelList = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.textEditorForm = this.fb.group({
      language: ['German'],
      languageLevel: ['A2'],
      count: [5],
      sourceWords: [null, Validators.required],
      context: [null],
    })
  }

}
