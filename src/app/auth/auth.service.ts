import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthApiService} from '../common-services/api-services/auth-api.service';
import {User, UserCredentials} from '../types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authApi: AuthApiService) {}

  login(credentials: UserCredentials): Observable<User> {
    return this.authApi.login(credentials);
  }

  register(userData: any): Observable<any> {
    return this.authApi.signup(userData);
  }
}
