import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink} from '@angular/router';
import {TextGeneratorApiService} from '../common-services/api-services/text-generator-api.service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {SessionService} from '../common-services/session.service';

@Component({
  selector: 'dl-top-toolbar',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatToolbar,
    RouterLink,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.scss'
})
export class TopToolbarComponent {
  private textGenerator = inject(TextGeneratorApiService);
  private sessionService = inject(SessionService);
  private router = inject(Router);
  isLoggedIn$ = this.sessionService.isLoggedIn$;

  checkConnection() {
    this.textGenerator.checkConnection().subscribe((res: any) => {
      console.log('Status of connection:', res);
    });
  }

  logout() {
    this.sessionService.unsetToken();
    this.router.navigate(['/']);
  }
}
