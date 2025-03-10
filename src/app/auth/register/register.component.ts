import {Component, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  AbstractControl,
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

const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.confirmPassword
    ? null
    : { PasswordNoMatch: true };
};

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['student', Validators.required]
    }, {validators: confirmPasswordValidator});
  }

  // confirmPasswordValidator<ValidatorFn>(
  //   control: AbstractControl
  // ): ValidationErrors | null {
  //   return control.value.password === control.value.confirmPassword
  //     ? null
  //     : { PasswordNoMatch: true };
  // }

  onSubmit() {
    console.log(this.registrationForm);
    if (this.registrationForm.invalid) return;
    const userData = this.registrationForm.getRawValue();
    if (userData.password !== userData.confirmPassword) {

    }
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
