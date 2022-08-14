import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Theme } from './shared/models/theme';
import { ThemeService } from './shared/theme/theme.service';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';
import { SharedService } from './shared/services/shared.service';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'flight-app-front';
  subscriptions: Subscription[] = [];

  constructor(private readonly translateService: TranslateService,
    private readonly themeService: ThemeService,
    private readonly sharedService: SharedService,
    private readonly dateAdapter: DateAdapter<Date>) {
    this.subscriptions.push(this.sharedService.selectedLanguage.subscribe(lang => {
      this.dateAdapter.setLocale(lang);
    }))
    const locale = localStorage.getItem('language');
    this.translateService.use(locale);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  ngAfterViewInit(): void {
    const constract = localStorage.getItem('constractType');
    if (isNullOrUndefined(constract)) {
      this.themeService.toggleDefaultTheme();
    }
    else {
      this.initConstract(constract);
    }

    this.subscriptions.push(this.sharedService.constractType.subscribe(constract => {
      this.initConstract(constract);
    }))
  }
  loadTheme(firstcolor: string, secondcolor: string, thirdcolor: string, fourthcolor: string) {
    const theme: Theme = new Theme();
    theme.firstColor = firstcolor;
    theme.secondColor = secondcolor;
    theme.thirdColor = thirdcolor;
    theme.fourthColor = fourthcolor;
    this.themeService.setTheme(theme);
  }
  private initConstract(constract: string) {
    if (constract === 'high') {
      this.loadTheme('#03257A', '#032E99', '#D3D3D3', '#EEEEEE');
    }
    else if (constract === 'normal') {
      this.loadTheme('#3f51b5', '#336EFF', '#B2CDD7', '#EAF9FF');
    }
    else {
      this.themeService.toggleDefaultTheme();
    }
  }
}
