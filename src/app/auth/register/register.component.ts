import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {AuthService} from '../auth.service';

@Component({
  selector: 'dl-register',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    MatCheckbox,
    TitleCasePipe,
    NgForOf
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  roles = ['student', 'teacher'];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      roles: this.fb.array([])
    });
  }

  onCheckboxChange(event: any) {
    const rolesArray: FormArray = this.registrationForm.get('roles') as FormArray;
    if (event.checked) {
      rolesArray.push(this.fb.control(event.source.value));
    } else {
      const index = rolesArray.controls.findIndex(control => control.value === event.source.value);
      rolesArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Форма відправлена', this.registrationForm.value);
      const userData = this.registrationForm.value;
      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Реєстрація успішна:', response);
        },
        error: (err) => {
          console.error('Помилка реєстрації:', err);
        }
      });
    }
  }
}
