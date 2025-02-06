import {Component, Input} from '@angular/core';
import {GapFillingTextComponent} from './gap-filling-text/gap-filling-text.component';
import {WordDefinitionComponent} from './word-definition/word-definition.component';
import {StatementsComponent} from './statements/statements.component';
import {QuestionAnswerComponent} from './question-answer/question-answer.component';
import {TranslationComponent} from './translation/translation.component';

@Component({
  selector: 'dl-content-preview',
  imports: [
    GapFillingTextComponent,
    WordDefinitionComponent,
    StatementsComponent,
    QuestionAnswerComponent,
    TranslationComponent,
  ],
  templateUrl: './content-preview.component.html',
  styleUrl: './content-preview.component.scss'
})
export class ContentPreviewComponent {
  @Input() content: any;
}
