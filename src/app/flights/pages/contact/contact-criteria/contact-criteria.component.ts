import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/util/matchValidators/errorStateMatcher';
import { FlightsService } from 'src/app/flights/services/flights.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact-criteria',
  templateUrl: './contact-criteria.component.html',
  styleUrls: ['./contact-criteria.component.css']
})
export class ContactCriteriaComponent implements OnInit {
  contactForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  adress= new FormControl('',[
    Validators.required,
    Validators.email
  ]);
  password = new FormControl('', [
    Validators.required
  ]);
  object= new FormControl('',[
    Validators.required
  ]);
   content= new FormControl('',[
    Validators.required
  ])
  loading=false;
  get contactControls() { return this.contactForm.controls; }
  constructor(private formBuilder: FormBuilder, private readonly flightsService:FlightsService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({  
      adress: this.adress,
      password: this.password,
      object: this.object,
      content: this.content    
    });  
  }
  send(){
      //this.submitted = true;
      // stop here if form is invalid
      if (this.contactForm.invalid) {
        return;    
      }
      this.loading = true;
      this.flightsService.contact(
        {
          adress: this.contactControls.adress.value,
          password: this.contactControls.password.value,
          object: this.contactControls.object.value,
          content: this.contactControls.content.value
        }   
      ).subscribe(
        (res: any) => {
          this.loading = false;
          this._snackBar.open('Message sent succesfully!', null, {
            duration: 2000,
            panelClass: ['blue-snackbar']
          });
         // this.router.navigate(['/authentification/login']);
        },
        (error) => {
          this.loading = false;
          this._snackBar.open('Message not sent !', null, {
            duration: 2000,
            panelClass: ['blue-snackbar']
          });
        })
  }
}
