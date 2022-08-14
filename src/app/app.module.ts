import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoaderFactory } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LangService } from './shared/lang/services/lang.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlightsModule } from './flights/flights.module';
import { PortalModule } from './portal/portal.module';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { DateAdapter, MatSelectModule, MatIconModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { LocaleDateAdapter } from './shared/util/dateAdapter/locale-date-adapter';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AuthentificationModule } from './authentification/authentification.module';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExceptionComponent } from './exceptions/exception/exception.component';
import { ResetPasswordComponent } from './authentification/reset-password/reset-password.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ExceptionComponent
  ],
  imports: [
    BrowserModule,
    FlightsModule,
    PortalModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthentificationModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [LangService]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, { provide: DateAdapter, useClass: LocaleDateAdapter },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}