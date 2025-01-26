import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {QuillEditorComponent} from "ngx-quill";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCard} from '@angular/material/card';
import {EditorSettingsComponent} from './editor-settings/editor-settings.component';
import {EditorGuideComponent} from './editor-guide/editor-guide.component';
import {MatButton} from '@angular/material/button';
import {EditorPageService} from './services/editor-page.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {SettingsForm} from '../types/editor.interface';
import {ToastrService} from 'ngx-toastr';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';

@Component({
  selector: 'dl-editor-page',
  imports: [
    QuillEditorComponent,
    MatSidenavModule,
    MatCard,
    EditorSettingsComponent,
    EditorGuideComponent,
    MatButton,
    MatInput,
    MatLabel,
    MatFormField,
    MatProgressBar,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorPageComponent {
  @ViewChild('quillInput') quillInput!: QuillEditorComponent;
  editorPageService = inject(EditorPageService);
  toastr = inject(ToastrService);
  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);
  isLoading = false;
  // todo: at the end Form should be typed of FormGroup<SettingsForm>.
  settingsForm: UntypedFormGroup = this.fb.group({
    language: ['German'],
    languageLevel: ['A2'],
    count: [5],
    autogenerateText: [false, {nonNullable: true}],
    showAnswer: [false, {nonNullable: true}],
    tenses: [],
    activeForm: [],
    konjunktiv: [],
    helperVerbs: [],
    deklination: [],
    kasus: [],
    taskType: [],
    context: [''],
    sourceWords: []
  });

  getControl(name: string): FormControl {
    return this.settingsForm.get(name) as FormControl;
  }

  submit() {
    console.log(this.settingsForm.getRawValue());
    const params = this.settingsForm.getRawValue();
    if (!params.autogenerateText) {
      const text = this.quillInput.quillEditor.getText().trim();
      if (!text) {
        this.toastr.error('Bitte geben Sie einen Text ein, bevor Sie eine Aufgabe generieren.');
        return;
      }
      params['text'] = text;
    }
    this.isLoading = true;
    this.editorPageService.generateText(params).subscribe((response) => {
      this.isLoading = false;
      this.cdr.detectChanges();
      console.log(response);
    });
  }
}
