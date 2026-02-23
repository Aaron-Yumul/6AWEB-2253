import { CommonModule, DatePipe } from '@angular/common'
import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';
    if (!value) return null;
    const startsWithLetter = /^[a-zA-Z]/.test(value);
    const alphanumericOnly = /^[a-zA-Z0-9]+$/.test(value);
    const minLength = value.length >= 8;
    if (!startsWithLetter) return { startsWithLetter: true };
    if (!alphanumericOnly) return { alphanumericOnly: true };
    if (!minLength) return { minLength: true };
    return null;
  };
}

export function birthYearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const date = new Date(control.value);
    if (date.getFullYear() > 2006) {
      return { birthYearTooRecent: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  imports: [
    DatePipe,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatChipsModule,
    MatStepperModule,
    MatProgressBarModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  userName: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  birthDate!: Date;
  address: string = '';
  angularSkillLevel: number = 5;
  role: string = '';
  submitted = false;
  minSkillLevel = 1;
  maxSkillLevel = 10;
  isDarkMode = true;
  hidePassword = true;

  maxDate = new Date(2006, 11, 31);

  constructor(private snackBar: MatSnackBar) {}

  formdata: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordValidator()]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required, birthYearValidator()]),
    address: new FormControl(''),
    role: new FormControl('', [Validators.required]),
    angularSkillLevel: new FormControl(5),
  });

  get pwValue(): string {
    return this.formdata.controls['password'].value || '';
  }
  get pwHasLength(): boolean {
    return this.pwValue.length >= 8;
  }
  get pwStartsWithLetter(): boolean {
    return /^[a-zA-Z]/.test(this.pwValue);
  }
  get pwIsAlphanumeric(): boolean {
    return this.pwValue.length > 0 && /^[a-zA-Z0-9]+$/.test(this.pwValue);
  }

  get formProgress(): number {
    const fields = [
      this.formdata.controls['userName'].valid,
      this.formdata.controls['email'].valid,
      this.formdata.controls['password'].valid,
      this.formdata.controls['gender'].valid,
      this.formdata.controls['birthDate'].valid,
      this.formdata.controls['role'].valid,
    ];
    return (fields.filter(v => v).length / fields.length) * 100;
  }

  get passwordError(): string {
    const ctrl = this.formdata.controls['password'];
    if (ctrl.hasError('startsWithLetter')) return 'Password must start with a letter.';
    if (ctrl.hasError('alphanumericOnly')) return 'Password must be alphanumeric only (no special characters).';
    if (ctrl.hasError('minLength')) return 'Password must be at least 8 characters.';
    return 'Password is required.';
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  onClickSubmit(data: {
    userName: string;
    email: string;
    password: string;
    gender: string;
    address: string;
    birthDate: Date;
    angularSkillLevel: number;
    role: string;
  }) {
    this.submitted = true;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.gender = data.gender;
    this.address = data.address;
    this.angularSkillLevel = data.angularSkillLevel;
    this.birthDate = data.birthDate;
    this.role = data.role;

    if (this.formdata.valid) {
      this.snackBar.open('Registration successful! Welcome aboard 🎉', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snack-success'],
      });
    } else {
      this.formdata.markAllAsTouched();
      this.snackBar.open('Please fix the errors before submitting.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snack-error'],
      });
    }
  }
}