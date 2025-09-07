import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalApiService} from './global-api.service';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskGeneratorApiService {

  constructor(
    private http: HttpClient,
    private globalApi: GlobalApiService
  ) { }

  generateTask(body: Params) {
    return this.http.post(this.globalApi.url + '/ai-factory/generate-task', body);
  }
}
