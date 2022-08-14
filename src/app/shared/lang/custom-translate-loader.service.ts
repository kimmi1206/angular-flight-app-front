import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { LangService } from "./services/lang.service";

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private langService: LangService) {}

  /**
   * Gets the translations by language.
   *
   * @param lang selected language.
   * @returns {Object}
   */
  public getTranslation(lang: string): Observable<Object> {
    return this.langService.getLabels(lang);
    }
}
