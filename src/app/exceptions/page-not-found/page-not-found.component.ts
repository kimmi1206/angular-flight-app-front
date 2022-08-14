import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  langs: Array<string>;
  language: FormGroup;
  constructor(private readonly translateService: TranslateService, private readonly sharedService: SharedService, private fb: FormBuilder, private readonly router: Router) {
    translateService.addLangs(['en_US', 'fr_FR']);
  }

  ngOnInit(): void {
    this.langs = this.translateService.getLangs();

    this.language = this.fb.group({
      language: [null, Validators.required]
    });
    const toSelect = this.langs.find(c => c == localStorage.getItem('language'));
    this.language.get('language').setValue(toSelect);
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
