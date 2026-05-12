import { Injectable } from '@angular/core';
import {TextGeneratorApiService} from '../../common-services/api-services/text-generator-api.service';
import {Observable} from 'rxjs';
import {BaseText, ExercisePreviewResult, ExerciseRequestDto} from '../../types/editor.interface';
import {TaskGeneratorApiService} from '../../common-services/api-services/task-generator-api.service';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  constructor(
    private textGeneratorApi: TextGeneratorApiService,
    private taskGeneratorApi: TaskGeneratorApiService
  ) { }

  getTexts(): Observable<BaseText[]> {
    return this.textGeneratorApi.getTexts();
  }

  generateTasks(body: ExerciseRequestDto): Observable<ExercisePreviewResult> {
    return this.taskGeneratorApi.generateTask(body);
  }
}
