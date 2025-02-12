import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() {
  }

  printSelectedTextWithStyles(text: string): void {
    const printWindow = window.open('', '', 'width=700,height=600');

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Playwrite+DE+SAS+Guides&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            <style>
              @page {
                size: A4;
                margin: 20mm;
              }

              body {
                font-family: "Playwrite DE SAS Guides", serif;
                font-size: 1.5em;
                margin: 0;
                padding: 0;
              }
              .gradient-text {
                background: repeating-linear-gradient(45deg, black 0, black 1px, black 2px, transparent 2px, transparent 4px);
                background-clip: text;
                color: transparent;
                display: inline;
              }
            </style>
          </head>
          <body>
            <p class="gradient-text">${text}</p>
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  }
}
