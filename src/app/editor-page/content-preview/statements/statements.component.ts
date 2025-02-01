import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'dl-statements',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatDivider,
  ],
  templateUrl: './statements.component.html',
  styleUrl: './statements.component.scss'
})
export class StatementsComponent {
  @Input() content!: {correctAnswer: boolean, statement: string}[];

}
