import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/shared/util/matchValidators/errorStateMatcher';
import { MustMatch } from 'src/app/shared/util/matchValidators/must-match.validator';
import { PasswordStrengthValidator } from 'src/app/shared/util/matchValidators/password-strength.validator';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  username = new FormControl('', [
    Validators.required,
  ]);
  password = new FormControl('', [
    Validators.required, Validators.minLength(8), PasswordStrengthValidator
  ]);
  confpassword = new FormControl('', [
    Validators.required
  ]);
  acceptTerms = new FormControl(false, [
    Validators.requiredTrue
  ]);
  matcher = new MyErrorStateMatcher();
  loading = false;
  submitted = false;
  u_username = false;
  u_email = false;
  get registerControls() { return this.registerForm.controls; }
  constructor(private authService: AuthentificationService, private router: Router, private formBuilder: FormBuilder,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
      confpassword: this.confpassword,
      email: this.email,
      acceptTerms: this.acceptTerms
    }, {
      validator: MustMatch('password', 'confpassword')
    });
  }
  register() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.register(
      {
        username: this.registerControls.username.value,
        email: this.registerControls.email.value,
        password: this.registerControls.password.value,
        confpassword: this.registerControls.confpassword.value
      }
    ).subscribe(
      (res: any) => {
        this.loading = false;
        this._snackBar.open('Account created successfully !', null, {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(['/authentification/login']);
      },
      (error) => {
        if ((error).includes('U_USERNAME')) {
          this.u_username = true;
          this.u_email = false;
        }
        else if ((error).includes('U_EMAIL')) {
          this.u_email = true;
          this.u_username = false;
        }
        this.loading = false;
      })
  }
  login() {
    this.router.navigate(['/authentification/login']);
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
  cancel() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
