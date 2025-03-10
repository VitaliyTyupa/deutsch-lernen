import {Component, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../auth.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {SessionService} from '../../common-services/session.service';

@Component({
  selector: 'dl-login',
  imports: [
    MatLabel,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatCardActions,
    RouterLink,
    MatIcon,
    NgIf
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: response => {
          this.sessionService.token = response.access_token;
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  changeStatus(event: Event) {
    event.preventDefault();
    this.showPassword.set(!this.showPassword());
  }
}
