import { Injectable } from '@angular/core';
import {TaskType} from '../../types/editor.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskOptionsService {

  taskTypesList: {[key: string]: TaskType} = {
    1: { "id": '1', name: $localize`:@@taskTypeGapTextName:Lückentext`, "description": $localize`:@@taskTypeGapTextDescription:Generieren Sie neue Sätze mit Quellwörtern.` },
    2: { "id": '2', name: $localize`:@@taskTypeWordDefinitionName:Wortdefinition`, "description": $localize`:@@taskTypeWordDefinitionDescription:Geben Sie Definitionen der Quellwörter an.` },
    3: { "id": '3', name: $localize`:@@taskTypeTrueFalseName:Richtig/Falsch-Aussage`, "description": $localize`:@@taskTypeTrueFalseDescription:Erstellen Sie Wahr/Falsch-Aussagen.` },
    4: { "id": '4', name: $localize`:@@taskTypeQuestionAnswerName:Frage Antwort`, "description": $localize`:@@taskTypeQuestionAnswerDescription:Generieren Sie Fragen zum Text.` },
    5: { "id": '5', name: $localize`:@@taskTypeTranslationName:Übersetzung`, "description": $localize`:@@taskTypeTranslationDescription:Generieren Sie Sätze zur Übersetzung.` }
  };

  constructor() { }

  getTaskName(id: string): string {
    return this.taskTypesList[id].name;
  }

  getTaskTypesList(condition?: string): TaskType[] {
    switch(condition) {
      case 'withoutText':
        return [1, 2, 5].map(id => this.taskTypesList[id]);
      default:
        return Object.keys(this.taskTypesList).map(id => this.taskTypesList[+id]);
    }
  }
}
