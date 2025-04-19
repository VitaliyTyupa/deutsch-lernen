import {Component, WritableSignal} from '@angular/core';
import {TopToolbarComponent} from './top-toolbar/top-toolbar.component';
import {RouterOutlet} from '@angular/router';
import {SessionService} from './common-services/session.service';
import {UserService} from './common-services/user.service';
import {MatProgressBar} from '@angular/material/progress-bar';
import {EventService} from './common-services/event.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'dl-root',
  imports: [
    TopToolbarComponent,
    RouterOutlet,
    MatProgressBar,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoading$: WritableSignal<boolean>;
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private eventService: EventService,
  ) {
    this.isLoading$ = this.eventService.isLoading$;
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
