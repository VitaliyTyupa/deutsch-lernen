import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalApiService} from './global-api.service';
import {User, UserCredentials} from '../../types/user.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthApiService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private globalApi: GlobalApiService
    ) {
    this.apiUrl = this.globalApi.url + '/auth';
  }

  login(credentials: UserCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials);
  }

  signup(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, user);
  }
}
