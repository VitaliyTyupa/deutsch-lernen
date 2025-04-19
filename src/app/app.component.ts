import { Component } from '@angular/core';
import {TopToolbarComponent} from './top-toolbar/top-toolbar.component';
import {RouterOutlet} from '@angular/router';
import {SessionService} from './common-services/session.service';
import {UserService} from './common-services/user.service';

@Component({
  selector: 'dl-root',
  imports: [
    TopToolbarComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) {
    this.initSession();
  }

  initSession() {
    this.sessionService.setTokenFromLocal();
    if(this.sessionService.isLoggedIn$()) {
      const userId = this.sessionService.getUserIdFromToken();
      if(userId) this.userService.updateCurrentUser(userId);
    }
  }
}
