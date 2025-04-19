import {Injectable, signal, WritableSignal} from '@angular/core';
import {LocalService} from './local.service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  private _token: string = '';
  isLoggedIn$: WritableSignal<boolean> = signal(false);


  constructor(
    private localService: LocalService,
  ) {
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
    return this.isValidToken(this._token);
  }

  isValidToken(token: string): boolean {
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if (decodedToken.exp && decodedToken.sub) {
      return (decodedToken.exp && Date.now()) < decodedToken.exp * 1000;
    } else {
      return false;
    }
  }

  setTokenFromLocal() {
    const localToken = this.localService.getData('dl-user');
    if (this.isValidToken(localToken)) {
      this.token = localToken;
    }
  }

  getUserIdFromToken(): string | undefined {
    if (this.isLoggedIn()) {
      const decodedToken = jwtDecode(this._token);
      return decodedToken.sub;
    } else {
      return undefined;
    }
  }
}
