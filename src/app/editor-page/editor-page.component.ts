import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal, ViewChild} from '@angular/core';
import {QuillEditorComponent} from "ngx-quill";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCard} from '@angular/material/card';
import {EditorSettingsComponent} from './editor-settings/editor-settings.component';
import {EditorGuideComponent} from './editor-guide/editor-guide.component';
import {MatButton} from '@angular/material/button';
import {EditorPageService} from './services/editor-page.service';
import {FormBuilder, FormControl, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';
import {ContentPreviewComponent} from './content-preview/content-preview.component';
import {MatDialog} from '@angular/material/dialog';
import {PreviewRequestModalComponent} from './preview-request-modal/preview-request-modal.component';
import {firstValueFrom, Observable} from 'rxjs';

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
    ContentPreviewComponent,
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
  matDialog = inject(MatDialog);
  isLoading = signal(false);

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

  generatedContent: any;

  getControl(name: string): FormControl {
    return this.settingsForm.get(name) as FormControl;
  }

  async submit() {
    console.log(this.settingsForm.getRawValue());
    const params = this.settingsForm.getRawValue();
    if (params.taskType?.includes(2) && !params.sourceWords) {
      this.toastr.error('Bitte geben Sie ein Wort ein, bevor Sie eine Aufgabe generieren.');
      return;
    }
    if (!params.autogenerateText) {
      const text = this.quillInput.quillEditor.getText().trim();
      if (!text) {
        this.toastr.error('Bitte geben Sie einen Text ein, bevor Sie eine Aufgabe generieren.');
        return;
      }
      params['text'] = text;
    }
    const confirm = await firstValueFrom(this.confirmRequest(params));
    if (!confirm) return;
    this.isLoading.set(true);
    this.editorPageService.generateText(params).subscribe({
      next: (data: any) => {
        // todo: need to clarify the returned Type of the data. Is it really only JSON?
        console.log(JSON.parse(data));
        this.toastr.success('Aufgabe erfolgreich generiert.');
        this.generatedContent = JSON.parse(data);
        this.cdr.detectChanges();
      },
      error: () => {
        this.toastr.error('Beim Generieren der Aufgabe ist ein Fehler aufgetreten.');
      },
      complete: () => {
        this.isLoading.set(false);
        this.cdr.detectChanges();
      }
    });
  }

  confirmRequest(request: any): Observable<boolean> {
    const dialogRef = this.matDialog.open(PreviewRequestModalComponent, {
      data: request
    });
    return dialogRef.afterClosed();
  }
}
