import {Injectable, signal} from '@angular/core';
import {LocalService} from './local.service';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  private _token: string = '';
  isLoggedIn$ = signal(false);


  constructor(
    private localService: LocalService
  ) {
    this.setTokenFromLocal();
  }

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
    this.localService.saveData('dl-user', token);
    this.isLoggedIn$.set(this.isLoggedIn());
  }

  unsetToken() {
    this._token = '';
    this.localService.removeData('dl-user');
    this.isLoggedIn$.set(this.isLoggedIn());
  }

  private isLoggedIn(): boolean {
    console.log(this._token);
    return !!this._token;
  }

  setTokenFromLocal() {
    const localToken = this.localService.getData('dl-user');
    console.log(localToken);
    // todo: check inspired token
    if (localToken) {
      this.token = localToken;
    }
  }
}
