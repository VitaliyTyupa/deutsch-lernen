import { Injectable } from '@angular/core';
import {TextGeneratorApiService} from '../../common-services/api-services/text-generator-api.service';

@Injectable({
  providedIn: 'root'
})
export class EditorPageService {

  constructor(
    private textGeneratorApi: TextGeneratorApiService
  ) { }

  generateText(words: any) {
    return this.textGeneratorApi.generateText({text: words});
  }


}
