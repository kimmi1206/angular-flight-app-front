import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../../../../app/shared/models/flight';
import { Router } from '@angular/router';
import { FlightsService } from '../../services/flights.service';
import { isNullOrUndefined } from 'util';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-action-bloc',
  templateUrl: './action-bloc.component.html',
  styleUrls: ['./action-bloc.component.css']
})
export class ActionBlocComponent implements OnInit {
  hideNext = false;
  hidePrevious = false;
  flightsIds: number[] = [];
  currentIndex = 0;
  currentPage = 0;
  isHidden = false;

  @Input()
  flightAction: Flight;
  constructor(private readonly sharedService:SharedService,private readonly flightsService: FlightsService, private readonly router: Router) { }

  ngOnInit(): void {
        this.flightsIds = this.flightsService.flightsIds;
      this.currentPage = this.flightAction.idFlight;
      this.currentIndex = this.flightsIds.indexOf(this.currentPage);
      if (this.currentIndex <= 0) {
        this.hidePrevious = true;
      }
      if (this.currentIndex >= this.flightsIds.length - 1) {
        this.hideNext = true;
      }
  }
  backToTheFlightsList() {
    this.router.navigate(['/flights/search']);
  }
  previousPage() {
    this.sharedService.orientation="prev";
    if (this.currentIndex <= 0) {
      this.hidePrevious = true;
    }
    else if (this.currentIndex > 0) {
      this.hidePrevious = false;
      this.currentIndex = this.currentIndex - 1;
      this.flightsService.getFlightDetails(this.flightsIds[this.currentIndex]);
    }
  }
  nextPage() {
    this.sharedService.orientation="next";
    if (this.currentIndex >= this.flightsIds.length - 1) {
      this.hideNext = true;
    }
    else if (this.currentIndex < this.flightsIds.length - 1) {
      this.hideNext = false;
      this.currentIndex = this.currentIndex + 1;
      this.flightsService.getFlightDetails(this.flightsIds[this.currentIndex]);
    }
  }
 changeVisibility() {
    this.isHidden = !this.isHidden;
  }
}
