import { Injectable } from '@angular/core';
import {TextGeneratorApiService} from '../../common-services/api-services/text-generator-api.service';

@Injectable({
  providedIn: 'root'
})
export class EditorPageService {

  constructor(
    private textGeneratorApi: TextGeneratorApiService
  ) { }

  generateText(params: any) {
    return this.textGeneratorApi.generateText({message: params});
  }


}
