import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalApiService {

  get url() {
    return '/api';
  }
}
