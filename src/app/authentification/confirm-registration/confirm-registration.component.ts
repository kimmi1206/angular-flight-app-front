import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {
  verifToken='';
  result='Verification in progress ...';
  redirect='';
  loading=true;
  timeLeft;
  interval;
  constructor(private router: Router,private _activatedRoute: ActivatedRoute,private authService: AuthentificationService) { }

  ngOnInit(): void {
   this._activatedRoute.queryParams.pipe(map(params => params['token'])).subscribe(token=>this.verifToken=token);
    this.authService.confirmRegistration(
        this.verifToken
    ).subscribe(
      (res) => {
        if(res==="valid"){
          this.timeLeft=5;
          this.result="Account verified successfully"
          this.redirect="You will be redirect to the sign in page in : "
          this.interval = setInterval(() => {
            if(this.timeLeft > 0) {
              this.timeLeft--;
            } else {
              this.router.navigate(['/authentification/login']);
            }
          },1000)
        }
        else if(res==="invalid"){
          this.result="Invalid token"
        }
        else if(res==="expired"){
          this.result="Token expired"
         }
         this.loading=false;
      },
      (error) => {
        console.log(error);        
        return;
      })
    ;

  }

}
