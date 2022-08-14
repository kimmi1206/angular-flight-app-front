import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Theme } from "../models/theme";
import { isNullOrUndefined } from "util";
import { Subject } from 'rxjs';

export const defaultTheme = {
  firstColor: '#3f51b5',
  secondColor: '#336EFF',
  thirdColor: '#B2CDD7',
  fourthColor: '#EAF9FF'
};
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isThemeReady = false;
  colors = [];
  colorsSub = new Subject<any[]>();
  private readonly isIEOrEdge = /msie\s|trident\/|edge\//i.test(
    window.navigator.userAgent
  );

  constructor(@Inject(DOCUMENT) private readonly document) { }

  toggleDefaultTheme() {
    this.setTheme(defaultTheme);
    this.colors = [
      {
        backgroundColor: [
          '#3f51b5',
          '#EAF9FF',
          '#B2CDD7'
        ]
      }
    ];
  }

  public setTheme(theme: Theme) {
    this.isThemeReady = false;

    this.setThemeForVarCss(theme);
    this.colors = [
      {
        backgroundColor: [
          theme.firstColor,
          theme.fourthColor,
          theme.thirdColor
        ]
      }
    ];
    this.colorsSub.next(this.colors)

    if (this.isIEOrEdge) {
      this.removeThemeStyleFromDomIfPresent();

      const style = this.buildThemeStyle(theme);
      this.document.querySelector("head").innerHTML += style;
    }
    this.isThemeReady = true;
  }

  private buildThemeStyle(theme: Theme): string {

    // --theme-color && --green variables
    let style = "<style id='theme-style'>";

    //SideBar
    style += `
    .menu {
      background: ${theme.firstColor};
    }
    .menu a:hover {
      background: ${theme.secondColor};
    }
    #titbar {
      background: ${theme.thirdColor};
  }
  #mainBanner {
    background:none no-repeat scroll left bottom ${theme.firstColor};
}
#flights tr:nth-child(even),#result tr:nth-child(even) {background:${theme.fourthColor}}
TABLE.t-data-grid TR:nth-child(even),#result tr:nth-child(even) {background:${theme.fourthColor}}
#flights .mat-cell a{
    color: ${theme.firstColor};
}
#mainBanner p span.expand{
  color: ${theme.firstColor};
}
#action #buttonBar{
  background-color: ${theme.fourthColor};
}
  `;

    style += "</style>";

    return style;
  }

  private removeThemeStyleFromDomIfPresent() {
    const styleDomElement = this.document.querySelector("#theme-style");

    if (!isNullOrUndefined(styleDomElement)) {
      styleDomElement.parentNode.removeChild(styleDomElement);
    }
  }

  public setThemeForVarCss(theme: Theme) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
