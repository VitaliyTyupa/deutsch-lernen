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
  @Input() content!: string [];
  sentencesCount: number = 0;
  processedText: string = '';
  gupWordsAnswer: string[] = [];
  shuffleWords: string[] = [];

  ngOnInit() {
    this.sentencesCount = this.content.length;
    [this.processedText, this.gupWordsAnswer] = this.processText(this.content.join(' '));
    this.shuffleWords = shuffleArray<string>(this.gupWordsAnswer);
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
