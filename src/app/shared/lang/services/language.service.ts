import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class LanguageService {

  private defaultLanguage: string = "fr_FR";

  constructor(private translateService: TranslateService, private http: HttpClient) {
    this.translateService.use(this.getLang());
  }

  /**
   *
   *
   * @param {string} [language=this.get()]
   * @memberof LanguageService
   */
  public set(language: string = this.getLang()): void {
    this.translateService.use(language);
    localStorage.setItem("language", language);
  }

  /**
   *
   *
   * @returns {string}
   * @memberof LanguageService
   */
  public getLang(): string {
    return localStorage.getItem("language") !== null ? localStorage.getItem("language") : this.defaultLanguage;
  }

  /**
   * Add observable to could refresh the language when choosing eng or seconde language
   * on the headerBar component
   * Observable navItem source
   *
     @param {string} lang
   * @memberof LanguageService
   */
  public changeLang(lang: string): void {
    let langSource: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultLanguage);
    langSource.next(lang);
  }

}
