import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/util/matchValidators/errorStateMatcher';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/flights/services/flights.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  fpassForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  loading = false;
  submitted = false;
  userNotExist = false;
  get fpassControls() { return this.fpassForm.controls; }
  constructor(private authService: FlightsService, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fpassForm = new FormGroup({
      email: this.email
    });
  }
  login() {
    this.router.navigate(['/authentification/login']);
  }

  cancel() {
    this.fpassForm.reset();
  }

  sendEmail(){ 
    this.submitted = true;
    // stop here if form is invalid
    if (this.fpassForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.forgotPassword(this.fpassControls.email.value
    ).subscribe(
      (res: any) => {
        this.loading = false;
        if(res==="Email sent"){
          this._snackBar.open('Email sent successfully !', null, {
            duration: 3000,
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(['/authentification/login']);
        }
        else if(res==="User not found"){
          this.userNotExist=true;
          return;
         }
      },
      (error) => {
        this.loading = false;
        return;
      })
  }
}
