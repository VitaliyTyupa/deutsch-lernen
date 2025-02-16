import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {fromEvent} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {NgIf} from '@angular/common';
import {MatError, MatInput} from '@angular/material/input';

@Component({
  selector: 'dl-text-input',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    NgIf,
    MatError,
    MatInput
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements AfterViewInit {
  @Input() textControl!: FormControl<string>;
  @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('textInput') textInput!: ElementRef;
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    this.handleSelectedTextWord();
  }

  handleSelectedTextWord() {
    const dblClick = fromEvent(this.textInput.nativeElement, 'dblclick');
    dblClick.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      console.log('Dbl click');
      // take selected word in inputText
      const start = this.textInput.nativeElement.selectionStart;
      const end = this.textInput.nativeElement.selectionEnd;
      const result = this.textInput.nativeElement.value.substring(start, end);
      if (result?.length < 3) return;
      this.onSelect.emit(result);
    });
  }
}
