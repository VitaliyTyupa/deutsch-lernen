import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalApiService} from './global-api.service';
import {Observable} from 'rxjs';
import {User} from '../../types/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserApiService {
  private apiUrl: string;
  constructor(
    private http: HttpClient,
    private globalApi: GlobalApiService
  ) {
    this.apiUrl = this.globalApi.url + '/user';
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
