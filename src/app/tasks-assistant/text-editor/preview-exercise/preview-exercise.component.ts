import {Component, Input} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

interface GapTextResult {
  text: string;
  answers: { id: number; answer: string }[];
}

interface TrueFalseResult {
  statements: { id: number; statement: string; answer: boolean }[];
}

interface QuestionAnswerResult {
  questions: { id: number; question: string; answer: string }[];
}

interface TranslateResult {
  translations: { id: number; source: string; target: string }[];
}

interface WordDefinitionResult {
  definitions: { word: string; definition: string }[];
}

export interface ExercisePreviewResult {
  gap_text?: GapTextResult;
  true_false?: TrueFalseResult;
  question_answer?: QuestionAnswerResult;
  translate?: TranslateResult;
  word_definition?: WordDefinitionResult;
}

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
