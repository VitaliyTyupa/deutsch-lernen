import {Component, Input} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {ExercisePreviewResult} from '../../../types/editor.interface';

@Component({
  selector: 'dl-preview-exercise',
  imports: [
    MatAccordion,
    MatCardModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
  ],
  templateUrl: './preview-exercise.component.html',
  styleUrl: './preview-exercise.component.scss'
})
export class PreviewExerciseComponent {
  @Input() result: ExercisePreviewResult | null = null;
}
