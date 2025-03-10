import {Injectable, signal} from '@angular/core';
import {User} from '../types/user.interface';
import {UserApiService} from './api-services/user-api.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {SessionService} from './session.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user!: User;
  user$ = signal(this._user);

  constructor(
    private userApi: UserApiService,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.checkSessionAndUpdateCurrentUser();
  }

  set user(user: User) {
    this._user = user;
    this.user$.set(this._user);
  }

  get user() {
    return this._user;
  }

  checkSessionAndUpdateCurrentUser() {
    const userId = this.sessionService.getUserIdFromToken();
    if (!userId) return;
    this.getUserById(userId).pipe(
      tap(user => this.user = user)
    ).subscribe({
      next: user => {this.toastr.success('Nutzerdaten aktualisiert')},
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
