import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {shuffleArray} from '../../../utils/functions';

@Component({
  selector: 'dl-word-definition',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatDivider
  ],
  templateUrl: './word-definition.component.html',
  styleUrl: './word-definition.component.scss'
})
export class WordDefinitionComponent implements OnInit {
  @Input() content!: {targetWord: string, definition: string} [];
  words: string[] = [];
  definitions: string[] = [];

  ngOnInit() {
    this.words = shuffleArray<string>(this.content.map(item => item.targetWord));
    this.definitions = shuffleArray<string>(this.content.map(item => item.definition));
  }
}
