import { Injectable } from '@angular/core';
import {TaskType} from '../../types/editor.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskOptionsService {

  taskTypesList: {[key: string]: TaskType} = {
    1: { "id": '1', name: 'Lückentext', "description": "Generieren Sie neue Sätze mit Quellwörtern." },
    2: { "id": '2', name: 'Wortdefinition', "description": "Geben Sie Definitionen der Quellwörter an." },
    3: { "id": '3', name: 'Richtig/Falsch-Aussage', "description": "Erstellen Sie Wahr/Falsch-Aussagen." },
    4: { "id": '4', name: 'Frage Antwort', "description": "Generieren Sie Fragen zum Text." },
    5: { "id": '5', name: 'Übersetzung', "description": "Generieren Sie Sätze zur Übersetzung." }
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
