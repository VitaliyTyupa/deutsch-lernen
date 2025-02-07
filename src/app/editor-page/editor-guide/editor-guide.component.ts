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
  tips: string[] = [
    'Wählen Sie zunächst die Sprache aus, in der die Aufgaben angeboten werden sollen.',
    'Geben Sie den Text ein, wenn Sie vorhaben, den Text zu bearbeiten, oder aktivieren Sie das Kontrollkästchen „Text automatisch generiert“ und geben Sie den Kontext im Feld „Betreff des Textes“ an, wenn Sie Ihren eigenen Text generieren möchten.',
    'Geben Sie eine Liste von kommagetrennten Wörtern ein, die Sie zuordnen möchten.',
    'Wählen Sie die spezifischen Aufgaben im Feld „Aufgabentyp auswählen“.',
    'Geben Sie die gewünschte Anzahl von Sätzen des Textes ein.',
    'Wählen Sie den Schwierigkeitsgrad der Aufgaben aus.',
    'Klicken Sie auf die Schaltfläche "Erzeugen" und warten Sie das Ergebnis der Anfrage ab.'
  ];
}
