import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {shuffleArray} from '../../../utils/functions';

@Component({
  selector: 'dl-gap-filling-text',
  imports: [
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatDivider
  ],
  templateUrl: './gap-filling-text.component.html',
  styleUrl: './gap-filling-text.component.scss'
})
export class GapFillingTextComponent implements OnInit{
  @Input() set content(data: string[]) {
    this.rawData = data;
    [this.processedText, this.gupWordsAnswer] = this.processText(data.join(' '));
    this.shuffleWords = shuffleArray<string>(this.gupWordsAnswer);
  };
  rawData: string[] = [];
  sentencesCount: number = 0;
  processedText: string = '';
  gupWordsAnswer: string[] = [];
  shuffleWords: string[] = [];

  ngOnInit() {
  }

  processText(text: string): [processedText: string, words: string[]] {
    const words: string[] = [];
    const processedText = text.replace(/\[([^\]]+)]/g, (match, p1, offset, string) => {
      words.push(p1);
      return `${'_ '.repeat(p1.length)} (${words.length})`;
    });
    return [processedText, words];
  }
}
