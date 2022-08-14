import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/shared/util/matchValidators/password-strength.validator';
import { MyErrorStateMatcher } from 'src/app/shared/util/matchValidators/errorStateMatcher';
import { MustMatch } from 'src/app/shared/util/matchValidators/must-match.validator';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthentificationService } from '../services/authentification.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  resetToken: string;
  password = new FormControl('', [
    Validators.required, Validators.minLength(8), PasswordStrengthValidator
  ]);
  confpassword = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  loading = false;
  invalid = false;
  userNotExist = false;
  submitted = false;
  get resetControls() { return this.resetForm.controls; }

  constructor(private formBuilder: FormBuilder, private router: Router,private _activatedRoute: ActivatedRoute,
    private authService: AuthentificationService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: this.password,
      confpassword: this.confpassword
    }, {
      validator: MustMatch('password', 'confpassword')
    });
    this._activatedRoute.queryParams.pipe(map(params => params['token'])).subscribe(token=>this.resetToken=token);
  }
  login() {   
    this.router.navigate(['/authentification/login']);
  }
  reset(){
    this.loading = true;
    this.authService.resetPassword(
      {
        token: this.resetToken,
        newPassword: this.resetControls.password.value
      }   
    ).subscribe(
      (res) => {
        this.loading = false;
        if(res==="Reset Success"){
          this._snackBar.open('Password reset successfully !', null, {
            duration: 3000,
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(['/authentification/login']);
        }
        else if(res==="Invalid token"){
         this.invalid=true;
         return;
        }
        else if(res==="User not exist"){
          this.userNotExist=true;
          return;
         }
      },
      (error) => {
        console.log(error);        
        this.loading = false;
        return;
      })
    ;
/*     this._activatedRoute.queryParams.subscribe(
      params => console.log('queryParams', params['token'])
    ); */
  }
  cancel() {
    this.submitted = false;
    this.resetForm.reset();
  }
}
