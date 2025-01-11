import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TextGeneratorApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  checkConnection() {
    return this.http.get('/api');
  }

  generateText(body: Params) {
    return this.http.post('/api/ai-factory/generate-text', body);
  }
}
