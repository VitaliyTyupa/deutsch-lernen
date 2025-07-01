import {Component, inject} from '@angular/core';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {SessionService} from '../common-services/session.service';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card';

@Component({
  selector: 'dl-home-page',
  imports: [
    MatButton,
    RouterLink,
    MatIcon,
    NgIf,
    MatCardFooter,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatMiniFabButton,
    MatCardActions
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private sessionService = inject(SessionService);
  isLoggedIn$ = this.sessionService.isLoggedIn$;
}
