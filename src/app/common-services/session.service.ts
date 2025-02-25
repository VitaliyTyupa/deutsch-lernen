import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  private _session: any = null;

  constructor() {
  }

  set session(session: any) {
    this._session = session;
  }

  get session() {
    return this._session;
  }

  clearSession() {
    this._session = null;
  }

  isAuthenticated() {
    return this._session !== null;
  }

  isGuest() {
    return this._session === null;
  }

  isTeacher() {
    return this._session?.role === 'teacher';
  }

  isStudent() {
    return this._session?.role === 'student';
  }
}
