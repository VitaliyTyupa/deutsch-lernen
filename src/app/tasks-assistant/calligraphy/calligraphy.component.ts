import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

interface CalligraphyFont {
  label: string;
  value: string;
  averageCharWidthMm: number;
}

@Component({
  selector: 'dl-calligraphy',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect
  ],
  templateUrl: './calligraphy.component.html',
  styleUrl: './calligraphy.component.scss'
})
export class CalligraphyComponent {
  readonly printableTextWidthMm = 190;
  readonly lineHeightMm = 10.5;
  readonly textXPositionMm = 2.25;
  readonly topGuideLine = 0.75;
  readonly bottomGuideLine = 7.5;
  readonly textBaseline = this.bottomGuideLine;
  readonly fontSizeMm = 7.5;
  readonly fonts: CalligraphyFont[] = [
    {
      label: 'Playwrite Deutschland Schulausgangschrift',
      value: 'Playwrite DE SAS',
      averageCharWidthMm: 3.9
    },
    {
      label: 'Playwrite Deutschland Grundschrift',
      value: 'Playwrite DE Grund',
      averageCharWidthMm: 3.6
    }
  ];
  textControl = new FormControl('Schreibe diesen Text nach.', {nonNullable: true});
  fontControl = new FormControl(this.fonts[0].value, {nonNullable: true});

  get text(): string {
    return this.textControl.value;
  }

  get selectedFont(): string {
    return this.fontControl.value;
  }

  get renderedLines(): string[] {
    const selectedFont = this.fonts.find(font => font.value === this.selectedFont) || this.fonts[0];
    const maxLineLength = Math.floor((this.printableTextWidthMm - this.textXPositionMm) / selectedFont.averageCharWidthMm);
    return this.text.split(/\r?\n/).flatMap(line => this.wrapLine(line, maxLineLength));
  }

  print(): void {
    const printWindow = window.open('', '', 'width=900,height=700');

    if (!printWindow) {
      return;
    }

    printWindow.document.write(this.getPrintMarkup());
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }

  private getPrintMarkup(): string {
    return `
      <html>
        <head>
          <title>Calligraphy</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Playwrite+DE+Grund&family=Playwrite+DE+SAS&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4;
              margin: 16mm;
            }

            body {
              margin: 0;
              color: #1f1f1f;
            }

            .calligraphy-sheet {
              display: flex;
              flex-direction: column;
              gap: 0;
              min-height: calc(297mm - 32mm);
              width: 100%;
            }

            .calligraphy-line {
              display: block;
              width: 100%;
              height: ${this.lineHeightMm}mm;
              overflow: visible;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          </style>
        </head>
        <body>
          <main class="calligraphy-sheet">${this.getPrintLinesMarkup()}</main>
        </body>
      </html>
    `;
  }

  private getPrintLinesMarkup(): string {
    return this.renderedLines
      .map((line, index) => this.getSvgLineMarkup(line, `dots-${index}`))
      .join('');
  }

  private getSvgLineMarkup(line: string, patternId: string): string {
    return `
      <svg class="calligraphy-line" width="100%" height="${this.lineHeightMm}mm" xmlns="http://www.w3.org/2000/svg">
        ${this.getLineDefs(patternId)}
        ${this.getGuideLines()}
        <text x="${this.textXPositionMm}mm" y="${this.textBaseline}mm" font-family="${this.escapeHtml(this.selectedFont)}, cursive" font-size="${this.fontSizeMm}mm" fill="url(#${patternId})">${this.escapeHtml(line)}</text>
      </svg>
    `;
  }

  private getLineDefs(patternId: string): string {
    return `
      <defs>
        <pattern id="${patternId}" width="0.9mm" height="0.9mm" patternUnits="userSpaceOnUse">
          <circle cx="0.3mm" cy="0.3mm" r="0.19mm" fill="#777" />
        </pattern>
      </defs>
    `;
  }

  private getGuideLines(): string {
    return `
      <line x1="0" y1="${this.topGuideLine}mm" x2="100%" y2="${this.topGuideLine}mm" stroke="#c7c7c7" stroke-width="0.09mm" />
      <line x1="0" y1="${this.bottomGuideLine}mm" x2="100%" y2="${this.bottomGuideLine}mm" stroke="#b7b7b7" stroke-width="0.09mm" />
    `;
  }

  private wrapLine(line: string, maxLineLength: number): string[] {
    if (!line.trim()) {
      return [''];
    }

    const words = line.trim().split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if (word.length > maxLineLength) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
        }
        lines.push(...this.splitLongWord(word, maxLineLength));
        continue;
      }

      const nextLine = currentLine ? `${currentLine} ${word}` : word;
      if (nextLine.length > maxLineLength) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = nextLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  private splitLongWord(word: string, maxLineLength: number): string[] {
    const parts: string[] = [];
    for (let index = 0; index < word.length; index += maxLineLength) {
      parts.push(word.slice(index, index + maxLineLength));
    }
    return parts;
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

}
