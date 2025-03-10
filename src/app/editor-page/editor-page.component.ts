import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DestroyRef,
  OnInit,
  signal, WritableSignal,
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
import {firstValueFrom, Observable} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {GeneratedResponse, TaskOptions} from '../types/editor.interface';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {PrintService} from './services/print.service';
import {TextInputComponent} from './text-input/text-input.component';

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
    MatSlideToggle,
    TextInputComponent,
  ],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorPageComponent implements OnInit{
  isLoading = signal(false);

  // todo: at the end Form should be typed of FormGroup<SettingsForm>.
  settingsForm!: UntypedFormGroup;

  generatedContent: WritableSignal<GeneratedResponse | null> = signal(null);

  constructor(
    private editorPageService: EditorPageService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private matDialog: MatDialog,
    private destroyRef: DestroyRef,
    private printService: PrintService
  ) {}

  ngOnInit() {
    this.settingsForm = this.fb.group({
      language: ['German'],
      languageLevel: ['A2'],
      count: [5],
      autogenerateText: [false, {nonNullable: true}],
      tenses: [],
      activeForm: [],
      konjunktiv: [],
      helperVerbs: [],
      deklination: [],
      kasus: [],
      taskType: [null, Validators.required],
      context: [null],
      sourceWords: [null, Validators.required],
      text: [null, Validators.required],
    });
    this.checkIfAutogenerateText();
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

  addSelectedWords(word: string) {
    const sourceWordField = this.settingsForm.get('sourceWords');
    const newValue = sourceWordField?.value ? `${sourceWordField.value}, ${word}` : word;
    this.settingsForm.get('sourceWords')?.setValue(newValue);
  }


  checkIfAutogenerateText() {
    this.settingsForm.get('autogenerateText')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value) => {
      if (value) {
        this.settingsForm.get('context')?.setValidators(Validators.required);
        this.settingsForm.get('text')?.removeValidators(Validators.required);
        this.settingsForm.get('text')?.updateValueAndValidity();
        this.settingsForm.get('context')?.updateValueAndValidity();
      } else {
        this.settingsForm.get('text')?.setValidators(Validators.required);
        this.settingsForm.get('context')?.removeValidators(Validators.required);
        this.settingsForm.get('text')?.updateValueAndValidity();
        this.settingsForm.get('context')?.updateValueAndValidity();
      }
      this.toastr.info('Bitte beachten Sie, dass die Einstellungen für die Aufgabengenerierung geändert wurden. Bitte wählen Sie mindestens einen Aufgabentyp aus.');
    });
  }

  generateTasks(params: TaskOptions) {
    this.isLoading.set(true);
    this.editorPageService.generateText(params).subscribe({
      next: (data: any) => {
        // todo: need to clarify the returned Type of the data. Is it really only JSON?
        console.log(JSON.parse(data));
        this.toastr.success('Aufgabe erfolgreich generiert.');
        this.generatedContent.set(JSON.parse(data));
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
