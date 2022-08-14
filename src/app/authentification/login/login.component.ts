import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/shared/util/matchValidators/errorStateMatcher';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  invalid = false;
  username = new FormControl('', [
    Validators.required
  ]);
  password = new FormControl('', [
    Validators.required
  ]);

  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  loading = false;
  disabledException: boolean;
  get loginControls() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(
      {
        username: this.loginControls.username.value,
        password: this.loginControls.password.value
      }
    ).subscribe(success => {
      if (success) {
        this.loading = false;
        this.router.navigate(['/flights/search']);
      }
      else {
        this.disabledException = this.authService.disabledException;
        if (this.disabledException) {
          this.loading = false;
          this.authService.disabledException=false;
          this.invalid = false;
          return;
        }
        this.loading = false;
        this.invalid = true;
      }
    }
    );

  }

  constructor(private authService: AuthentificationService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  register() {
    this.router.navigate(['/authentification/register']);
  }

  cancel() {
    this.submitted = false;
    this.loginForm.reset();
  }
  resetPassword() {
    this.router.navigate(['/authentification/forgot-password']);
  }

}
