import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../../app/shared/services/shared.service';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit {
  langs: Array<string>;
  language: FormGroup;
  remontedResult:number;
  loggedUser:string;
  constructor(private authService: AuthentificationService,private readonly translateService: TranslateService, private readonly sharedService: SharedService, private readonly router: Router, private fb: FormBuilder) {
    translateService.addLangs(['en_US', 'fr_FR']);
  }

  ngOnInit(): void {
    this.langs = this.translateService.getLangs();
    this.language = this.fb.group({
      language: [null, Validators.required]
    });
    const toSelect = this.langs.find(c => c == localStorage.getItem('language'));
    this.language.get('language').setValue(toSelect);
    this.remontedResult=this.sharedService.remontedResultSub;
    this.loggedUser=localStorage.getItem("loggedUser");
  }
  synthesisPage() {
    this.router.navigate(['/flights/synthesis']);
  }
  flightsPage() {
    this.sharedService.remontedResultSub=null;
    this.router.navigate(['/flights/search']);
  }
  bookmarksPage() {
    this.router.navigate(['/flights/bookmarks']);
  }
  contact() {
    this.router.navigate(['/flights/contact']);
  }
  logOut(){
    this.authService.doLogoutUser();
    this.sharedService.haveResult = false;
    this.sharedService.syntheseHaveResult = false;
    this.sharedService.remontedResultSub=null;
    this.router.navigate(['/authentification/login']);
  }
  changeLang(language: string) {
    localStorage.setItem('language', language);
    this.translateService.use(language);
    if (language === 'en_US') {
      this.sharedService.selectedLanguage.next('en');
    }
    else if (language === 'fr_FR') {
      this.sharedService.selectedLanguage.next('fr');
    }
  }
}
