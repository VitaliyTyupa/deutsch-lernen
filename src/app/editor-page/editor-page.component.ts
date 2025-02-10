import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DestroyRef,
  OnInit,
  signal,
  ElementRef,
  ViewChild
} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCard} from '@angular/material/card';
import {EditorSettingsComponent} from './editor-settings/editor-settings.component';
import {EditorGuideComponent} from './editor-guide/editor-guide.component';
import {MatButton} from '@angular/material/button';
import {EditorPageService} from './services/editor-page.service';
import {FormBuilder, FormControl, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';
import {ContentPreviewComponent} from './content-preview/content-preview.component';
import {MatDialog} from '@angular/material/dialog';
import {PreviewRequestModalComponent} from './preview-request-modal/preview-request-modal.component';
import {firstValueFrom, fromEvent, Observable} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TaskOptions} from '../types/editor.interface';

@Component({
  selector: 'dl-editor-page',
  imports: [
    MatSidenavModule,
    MatCard,
    EditorSettingsComponent,
    EditorGuideComponent,
    MatButton,
    MatInput,
    MatLabel,
    MatFormField,
    MatError,
    MatProgressBar,
    NgIf,
    ReactiveFormsModule,
    ContentPreviewComponent,
  ],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorPageComponent implements OnInit, AfterViewInit{
  @ViewChild('textInput') textInput!: ElementRef;

  isLoading = signal(false);

  // todo: at the end Form should be typed of FormGroup<SettingsForm>.
  settingsForm!: UntypedFormGroup;

  generatedContent: any;

  constructor(
    private editorPageService: EditorPageService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private matDialog: MatDialog,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.settingsForm = this.fb.group({
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
      taskType: [null, Validators.required],
      context: [null],
      sourceWords: [null, Validators.required],
      text: [null, Validators.required]
    });

  }

  ngAfterViewInit() {
    this.handleSelectedTextWord();
  }

  getControl(name: string): FormControl {
    return this.settingsForm.get(name) as FormControl;
  }

  async submit() {
    this.settingsForm.markAllAsTouched()
    if (this.settingsForm.invalid) return;
    const params = this.settingsForm.getRawValue();
    const confirm = await firstValueFrom(this.confirmRequest(params));
    if (!confirm) return;
    this.generateTasks(params);
  }

  resetForm() {
    this.settingsForm.reset();
  }

  confirmRequest(request: any): Observable<boolean> {
    const dialogRef = this.matDialog.open(PreviewRequestModalComponent, {
      data: request
    });
    return dialogRef.afterClosed();
  }

  handleSelectedTextWord() {
    const dblClick = fromEvent(this.textInput.nativeElement, 'dblclick');
    dblClick.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      // take selected word in inputText
      const start = this.textInput.nativeElement.selectionStart;
      const end = this.textInput.nativeElement.selectionEnd;
      const result = this.textInput.nativeElement.value.substring(start, end);
      if (result?.length < 3) return;
      // add selected word to sourceWords
      const sourceWordField = this.settingsForm.get('sourceWords');
      const newValue = sourceWordField?.value ? `${sourceWordField.value}, ${result}` : result;
      this.settingsForm.get('sourceWords')?.setValue(newValue);
    });
  }

  generateTasks(params: TaskOptions) {
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
}
