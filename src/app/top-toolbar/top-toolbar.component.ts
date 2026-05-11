import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink} from '@angular/router';
import {TextGeneratorApiService} from '../common-services/api-services/text-generator-api.service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {SessionService} from '../common-services/session.service';
import {UserService} from '../common-services/user.service';
import {NgIf, TitleCasePipe} from '@angular/common';

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
    MatMenuTrigger,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.scss'
})
export class TopToolbarComponent {
  readonly supportedLanguages = ['de', 'uk', 'en'] as const;
  readonly activeLanguage = this.getActiveLanguage();
  private textGenerator = inject(TextGeneratorApiService);
  private sessionService = inject(SessionService);
  private router = inject(Router);
  private userService = inject(UserService);
  isLoggedIn$ = this.sessionService.isLoggedIn$;
  user$ = this.userService.user$;

  checkConnection() {
    this.textGenerator.checkConnection().subscribe((res: any) => {
      console.log('Status of connection:', res);
    });
  }

  logout() {
    this.sessionService.unsetToken();
    this.router.navigate(['/']);
  }

  switchLanguage(lang: 'de' | 'uk' | 'en'): void {
    if (lang === this.activeLanguage) {
      return;
    }

    const path = window.location.pathname.replace(/^\/(de|uk|en)(?=\/|$)/, '') || '/';
    window.location.href = `/${lang}${path}${window.location.search}${window.location.hash}`;
  }

  private getActiveLanguage(): 'de' | 'uk' | 'en' {
    const locale = window.location.pathname.match(/^\/(de|uk|en)(?=\/|$)/)?.[1];
    return locale === 'uk' || locale === 'en' ? locale : 'de';
  }
}
