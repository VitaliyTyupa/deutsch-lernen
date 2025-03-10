import {Component, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../auth.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'dl-register',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    MatCardTitle,
    MatCardContent,
    MatCard,
    MatCardActions,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  private router = inject(Router);
  registrationForm: FormGroup;
  showPassword = signal(false);
  confirmPasswordValidator: ValidatorFn = (): ValidationErrors | null => {
    if (!this.registrationForm) return null;
    const formValue = this.registrationForm.getRawValue();
    return formValue.password === formValue.confirmPassword
      ? null
      : { PasswordNoMatch: true };
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [this.confirmPasswordValidator]],
      role: ['student', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.registrationForm);
    if (this.registrationForm.invalid) return;
    const userData = this.registrationForm.getRawValue();
    delete userData.confirmPassword;
    this.authService.register(userData).subscribe({
      next: (response) => {
        this.toastr.success('Benutzer erfolgreich registriert!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  changeStatus(event: Event) {
    event.preventDefault();
    this.showPassword.set(!this.showPassword());
  }
}
