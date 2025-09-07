import { Injectable } from '@angular/core';
import {TextGeneratorApiService} from '../../common-services/api-services/text-generator-api.service';
import {Observable} from 'rxjs';
import {BaseText} from '../../types/editor.interface';
import {Params} from '@angular/router';
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

  generateTasks(body: Params): Observable<any> {
    return this.taskGeneratorApi.generateTask(body);
  }
}
