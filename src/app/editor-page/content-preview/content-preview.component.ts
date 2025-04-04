import {Component, inject, Input, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {GapFillingTextComponent} from './gap-filling-text/gap-filling-text.component';
import {WordDefinitionComponent} from './word-definition/word-definition.component';
import {StatementsComponent} from './statements/statements.component';
import {QuestionAnswerComponent} from './question-answer/question-answer.component';
import {TranslationComponent} from './translation/translation.component';
import {ToastrService} from 'ngx-toastr';
import {TaskOptionsService} from '../services/task-options.service';
import {GeneratedResponse} from '@app/types/editor.interface';

@Component({
  selector: 'dl-content-preview',
  imports: [
    GapFillingTextComponent,
    WordDefinitionComponent,
    StatementsComponent,
    QuestionAnswerComponent,
    TranslationComponent,
  ],
  templateUrl: './content-preview.component.html',
  styleUrl: './content-preview.component.scss'
})
export class ContentPreviewComponent implements OnInit {
  @Input() set content(data: GeneratedResponse | null) {
    if (!data) return;
    let filteredTasks = data.outputTasks.filter((item: {id: string, value: any}) => {
      if (!Array.isArray(item.value)) {
        this.toastr.warning(`Die Aufgabe ${this.taskOptionsService.getTaskName(item.id)} hat falsche format!`);
        return false;
      } else {
        return true;
      }
    });
    filteredTasks = filteredTasks.map(item => ({...item, id: `${item.id}`}));
    this.tasks.set(filteredTasks)
  };
  tasks: WritableSignal<{ id: string; value: any; }[]> = signal([]);
  toastr = inject(ToastrService);
  taskOptionsService = inject(TaskOptionsService);


  ngOnInit() {
  }
}
