import { Component } from '@angular/core';
import {MatStep, MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'dl-editor-guide',
  imports: [
    MatStep,
    MatStepper
  ],
  templateUrl: './editor-guide.component.html',
  styleUrl: './editor-guide.component.scss'
})
export class EditorGuideComponent {

}
