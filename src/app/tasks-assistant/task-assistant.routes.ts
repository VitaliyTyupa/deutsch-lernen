import {Routes} from '@angular/router';
import {TextGeneratorComponent} from './text-generator/text-generator.component';
import {TextEditorComponent} from './text-editor/text-editor.component';
import {VocabularyEditComponent} from './vocabulary-edit/vocabulary-edit.component';
import {TasksAssistantComponent} from './tasks-assistant.component';

export const taskAssistantRoutes: Routes = [
  {
    path: '',
    component: TasksAssistantComponent,
    children: [
      {
        path: '',
        redirectTo: 'text-generator',
        pathMatch: 'full',
      },
      {
        path: 'text-generator',
        component: TextGeneratorComponent,
      },
      {
        path: 'task-editor',
        component: TextEditorComponent,
      },
      {
        path: 'vocabulary-editor',
        component: VocabularyEditComponent,
      }
    ]
  }
];
