import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Params} from '@angular/router';
import {GlobalApiService} from './global-api.service';

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
}
