import {Injectable, signal} from '@angular/core';
import {LocalService} from './local.service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  private _token: string = '';
  isLoggedIn$ = signal(false);


  constructor(
    private localService: LocalService,
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
    return !!this._token;
  }

  getUserIdFromToken(): string | undefined {
    if (this.isLoggedIn()) {
      const decodedToken = jwtDecode(this._token);
      return decodedToken.sub;
    } else {
      return undefined;
    }
  }

  setTokenFromLocal() {
    const localToken = this.localService.getData('dl-user');
    if (!localToken) return;
    const decodedToken = jwtDecode(localToken);
    const isValidTime = decodedToken.exp && Date.now() < decodedToken.exp * 1000;
    if (localToken && isValidTime) this.token = localToken;
  }
}
