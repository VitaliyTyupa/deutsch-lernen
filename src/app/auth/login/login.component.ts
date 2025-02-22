import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../auth.service';

@Component({
  selector: 'dl-login',
  imports: [
    MatLabel,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Форма відправлена:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: response => {
          console.log('Реєстрація успішна:', response);
        },
        error: (err) => {
          console.error('Помилка реєстрації:', err);
        }
      })
    }
  }
}
