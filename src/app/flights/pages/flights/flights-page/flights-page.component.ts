import { Component, OnInit, OnDestroy } from '@angular/core';
import { Flight } from '../../../../../app/shared/models/flight';
import { MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { FlightsService } from '../../../../../app/flights/services/flights.service';
import { FlightCriteria } from '../../../../../app/shared/models/flightCriteria';
import { SharedService } from '../../../../../app/shared/services/shared.service';
import { Bookmark } from '../../../../../app/shared/models/bookmark';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { trigger, transition, query, animate, style, state, keyframes } from '@angular/animations';

@Component({
  selector: 'app-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.css'],
  animations: [
		trigger(
			"orientAnimation",
			[
        transition("* => *", [
        query(
          ":enter",
          [
            style({
             position:'absolute',
             left:0,
             width:'100%',
             opacity: 0,
             transform:'scale(0) translateY(100%)'
            }),
            animate('600ms ease', style({opacity: 1,transform:'scale(1) translateY(0)'})) 
          ],
          { optional: true }
        ),
        query(
          ":leave",
          [
            animate('2000ms ease', keyframes([
              style({ transform: 'scale(1)', offset: 0 }),
              style({ transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35 }),
              style({ opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1 }),
            ])),          ],
          { optional: true }
        )
        ])
      ]
    )
	]
})
export class FlightsPageComponent implements OnInit, OnDestroy {
  flightsData = new MatTableDataSource<Flight>();
  isHiddenSearch = false;
  show = false;
  emptyData = false;
  loading = false;
  remontedResult: number;
  flightCriteria: FlightCriteria;
  headerLabel = 'headers.home.label';
  iconLabel = 'search';
  bdcrumbsLabel = 'bdcrumbs.search.label';
  subscriptions: Subscription[] = [];
  flights: Flight[]=[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private readonly flightsService: FlightsService, private readonly sharedService: SharedService,private _snackBar: MatSnackBar) { }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.flights.push(new Flight());
    }
  searchFlights(flightCriteria: FlightCriteria) {
    this.flightCriteria = flightCriteria;
    this.isHiddenSearch = true;
    this.loading = true;
    this.subscriptions.push(this.flightsService.searchFlights(flightCriteria).pipe(catchError(_err => of(this.flights)))
      .subscribe(flightsList => {
        this.flightsData.data = flightsList;
        this.remontedResult = flightsList.length;
        this.loading = false;
        if (this.remontedResult === 0) {
          this.emptyData = true;
          this.show = false;
          this.isHiddenSearch = false;
        }
        else {
          this.sharedService.remontedResultSub=this.remontedResult;
          this.sharedService.haveResult = true;
          this.show = true;
          this.emptyData = false;
        }
      }))
  }
  changeVisibilitySearchForm() {
    this.isHiddenSearch = !this.isHiddenSearch;
  }
  showFlightsList(showList: boolean) {
    this.show = showList;
  }  
  addBookmark(title: string) {
    const bookmark: Bookmark = new Bookmark();
    bookmark.title = title;
    bookmark.addingDate = new Date();
    bookmark.flightCriteria = this.flightCriteria;
    bookmark.nbFlights = this.remontedResult;
    this.subscriptions.push(this.flightsService.addBookmark(bookmark).subscribe(data => {
      this._snackBar.open('Bookmark added successfully !', null, {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['blue-snackbar']
      });
    }));
  }
}
