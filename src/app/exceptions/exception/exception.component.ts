import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css']
})
export class ExceptionComponent implements OnInit {
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
