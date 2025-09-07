import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Params} from '@angular/router';
import {GlobalApiService} from './global-api.service';
import {Observable} from 'rxjs';
import {BaseText} from '../../types/editor.interface';

@Injectable({
  providedIn: 'root'
})
export class TextGeneratorApiService {

  constructor(
    private http: HttpClient,
    private globalApi: GlobalApiService
  ) {
  }

  checkConnection() {
    return this.http.get(this.globalApi.url);
  }

  generateText(body: Params) {
    return this.http.post(this.globalApi.url + '/ai-factory/generate-text', body);
  }

  generateText_V2(body: Params): Observable<{text: string}> {
    return this.http.post<{text: string}>(this.globalApi.url + '/ai-factory/generate-text-v2', body);
  }

  saveText(body: Params) {
    return this.http.post(this.globalApi.url + '/text', body);
  }

  getTexts(): Observable<BaseText[]> {
    return this.http.get<BaseText[]>(this.globalApi.url + '/text/all');
  }
}
