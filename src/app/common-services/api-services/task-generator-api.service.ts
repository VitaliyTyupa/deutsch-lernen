import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalApiService} from './global-api.service';
import {Observable} from 'rxjs';
import {ExercisePreviewResult, ExerciseRequestDto} from '../../types/editor.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskGeneratorApiService {

  constructor(
    private http: HttpClient,
    private globalApi: GlobalApiService
  ) { }

  generateTask(body: ExerciseRequestDto): Observable<ExercisePreviewResult> {
    return this.http.post<ExercisePreviewResult>(this.globalApi.url + '/ai-factory/generate-task', body);
  }
}
