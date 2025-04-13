import {Injectable, signal} from '@angular/core';
import {LocalService} from './local.service';
import { jwtDecode } from "jwt-decode";
import {tap} from 'rxjs';
import {UserService} from './user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UserApiService} from './api-services/user-api.service';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  private _token: string = '';
  isLoggedIn$ = signal(false);


  constructor(
    private localService: LocalService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private userApi: UserApiService,
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
    if (decodedToken.exp) {
      const isValidTime = decodedToken.exp && Date.now() < decodedToken.exp * 1000;
      const date = Date.now();
      const exp = decodedToken.exp * 1000;
      console.log(exp, date, date < exp, date - exp);
      if (localToken && isValidTime) {
        this.token = localToken;
        if(decodedToken.sub) this.updateCurrentUser(decodedToken.sub);
      }
    }


  }

  updateCurrentUser(userId: string) {
    this.userService.getUserById(userId).pipe(
      // tap(user => this.user = user)
    ).subscribe({
      next: user => {this.toastr.success('Nutzerdaten aktualisiert')},
      error: () => {
        this.toastr.error('Nutzerdaten konnten nicht aktualisiert werden. Bitte melden Sie sich erneut an.');
        this.router.navigate(['/login']);
      }
    })
  }
}
