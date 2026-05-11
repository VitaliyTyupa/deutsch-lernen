import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {SessionService} from '../common-services/session.service';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {
  MatCard,
  MatCardContent,
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
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private sessionService = inject(SessionService);
  isLoggedIn$ = this.sessionService.isLoggedIn$;
}
