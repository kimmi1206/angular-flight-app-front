import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Flight } from '../../../app/shared/models/flight';
import { FlightCriteria } from '../../../app/shared/models/flightCriteria';
import { Router } from '@angular/router';
import { SynthesisCriteria } from '../../../app/shared/models/synthesisCriteria';
import { SynthesisCompany } from '../../../app/shared/models/synthesisCompany';
import { Bookmark } from '../../../app/shared/models/bookmark';
import { SynthesisTrip } from '../../../app/shared/models/synthesisTrip';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { Email } from 'src/app/shared/models/email';
import { PasswordReset } from 'src/app/shared/models/password';
import { LoginResponse } from 'src/app/shared/models/loginResponse';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightsService implements OnDestroy {
  readonly FLIGHTS_URL: string = `/flight-webservices/api/v1.0/flights`;
  flightDetails: Flight;
  flightCriteria: FlightCriteria;
  flightsIds: number[] = [];
  subscriptions: Subscription[] = [];
  constructor(private readonly http: HttpClient, private authService: AuthentificationService, private readonly router: Router) {
  }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getJwtToken()}`
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  getFlightList(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.FLIGHTS_URL);
  }

  searchFlights(flightCriteria: FlightCriteria): Observable<Flight[]> {
    return this.http.post<Flight[]>(this.FLIGHTS_URL, flightCriteria);
  }

  getFlight(idFlight: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.FLIGHTS_URL}/${idFlight}`);
  }

  synthesisCompanyFlights(synthesisCriteria: SynthesisCriteria): Observable<SynthesisCompany[]> {
    return this.http.post<SynthesisCompany[]>(this.FLIGHTS_URL + '/syntheseCompanyFlights', synthesisCriteria);
  }

  synthesisTripFlights(synthesisCriteria: SynthesisCriteria): Observable<SynthesisTrip[]> {
    return this.http.post<SynthesisTrip[]>(this.FLIGHTS_URL + '/syntheseTripFlights', synthesisCriteria);
  }

  getNumberFlights(synthesisCriteria: SynthesisCriteria): Observable<number> {
    return this.http.post<number>(this.FLIGHTS_URL + '/numberFlights', synthesisCriteria);
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.FLIGHTS_URL + '/bookmarks', bookmark);
  }
  getBookmarkList(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.FLIGHTS_URL + '/bookmarks');
  }
  getBookmark(idBookmark: number): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.FLIGHTS_URL}/bookmarks/${idBookmark}`);
  }
  deleteBookmark(idBookmark: number) {
    return this.http.delete<Bookmark>(`${this.FLIGHTS_URL}/bookmarks/${idBookmark}`);
  }
  deleteAllBookmark() {
    return this.http.delete<Bookmark>(`${this.FLIGHTS_URL}/bookmarks`);
  }
  contact(email: Email): Observable<Email> {
    return this.http.post<Email>(this.FLIGHTS_URL + '/contact', email);
  }
  forgotPassword(email: String) {
    return this.http.post(this.FLIGHTS_URL + '/forgotPassword', email).pipe(map((res:LoginResponse) => res.token));
  }

  getFlightDetails(idFlight: number): void {
    this.subscriptions.push(this.getFlight(idFlight).subscribe(flightResult => {
      this.flightDetails = flightResult;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/flights/details']));
    }));
  }
  viewBookmark(idBookmark: number): void {
    this.subscriptions.push(this.getBookmark(idBookmark).subscribe(bookmark => {
      this.flightCriteria = bookmark.flightCriteria;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/flights/search']));
    }));
  }
}
