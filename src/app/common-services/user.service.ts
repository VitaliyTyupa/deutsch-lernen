import {Injectable, signal} from '@angular/core';
import {User} from '../types/user.interface';
import {UserApiService} from './api-services/user-api.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user!: User;
  user$ = signal(this._user);

  constructor(
    private userApi: UserApiService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  set user(user: User) {
    this._user = user;
    this.user$.set(this._user);
  }

  get user() {
    return this._user;
  }

  updateCurrentUser(userId: string) {
    this.getUserById(userId).pipe(
      tap(user => this.user = user)
    ).subscribe({
      next: () => {this.toastr.success('Nutzerdaten aktualisiert')},
      error: () => {
        this.toastr.error('Nutzerdaten konnten nicht aktualisiert werden. Bitte melden Sie sich erneut an.');
        this.router.navigate(['/login']);
      }
    })
  }

  getUserById(id: string): Observable<User> {
    return this.userApi.getUserById(id);
  }
}
