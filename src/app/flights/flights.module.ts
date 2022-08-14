import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule, MatCardModule,
  MatPaginatorModule, MatSortModule,
  MatIconModule, MatCheckboxModule,
  MatButtonModule, MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  DateAdapter,
  MatToolbarModule,
  MatProgressBarModule,
  MatRippleModule
} from '@angular/material';
import { FlightsListComponent } from './components/flights-list/flights-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlightsComponent } from './pages/flights/flights.component';
import { FlightsPageComponent } from './pages/flights/flights-page/flights-page.component';
import { FlightsDetailsComponent } from './pages/flights/flights-details/flights-details.component';
import { SharedModule } from '../shared/shared.module';
import { PortalModule } from '../portal/portal.module';
import { FlightSearchSummaryComponent } from './components/flight-search-summary/flight-search-summary.component';
import { FlightInfosComponent } from './components/flight-infos/flight-infos.component';
import { CabinDetailsComponent } from './components/cabin-details/cabin-details.component';
import { InflightServicesComponent } from './components/inflight-services/inflight-services.component';
import { ActionBlocComponent } from './components/action-bloc/action-bloc.component';
import { SynthesisComponent } from './pages/synthesis/synthesis.component';
import { SynthesisCriteriaComponent } from './pages/synthesis/synthesis-criteria/synthesis-criteria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SynthesisSummaryComponent } from './pages/synthesis/synthesis-summary/synthesis-summary.component';
import { SynthesisFlightsComponent } from './pages/synthesis/synthesis-flights/synthesis-flights.component';
import { ChartsModule } from 'ng2-charts';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { BookmarksListComponent } from './pages/bookmarks/bookmarks-list/bookmarks-list.component';
import { ReplaceNullValuePipe } from '../shared/util/pipes/replace-null-value.pipe';
import { I18nDatePipe } from '../shared/util/pipes/i18n-date.pipe';
import { SynthesisTripComponent } from './pages/synthesis/synthesis-trip/synthesis-trip.component';
import { LoginComponent } from '../authentification/login/login.component';
import { FlightsRoutingModule } from './flights-routing.module';
import { AuthentificationComponent } from '../authentification/authentification.component';
import { AuthentificationModule } from '../authentification/authentification.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatElevationDirective } from '../shared/util/directives/matElevationDirective';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactCriteriaComponent } from './pages/contact/contact-criteria/contact-criteria.component';

@NgModule({
  declarations: [FlightsListComponent, FlightsComponent, FlightsPageComponent,
    FlightsDetailsComponent, FlightSearchSummaryComponent, FlightInfosComponent,
    CabinDetailsComponent, InflightServicesComponent, ActionBlocComponent,
    SynthesisComponent, SynthesisCriteriaComponent, SynthesisSummaryComponent,
    SynthesisFlightsComponent, BookmarksComponent, BookmarksListComponent,
    I18nDatePipe, ReplaceNullValuePipe, SynthesisTripComponent,MatElevationDirective, ContactComponent, ContactCriteriaComponent],

  imports: [
    CommonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    TranslateModule,
    SharedModule,
    PortalModule,
    FlightsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    ChartsModule,
    MatDialogModule,
    MatToolbarModule,
    MatProgressBarModule,
    AuthentificationModule,
    MatSnackBarModule,
    MatRippleModule],  
  providers: [
  ]
})
export class FlightsModule { }
