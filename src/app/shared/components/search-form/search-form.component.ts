import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SharedService } from '../../services/shared.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { FlightCriteria } from '../../models/flightCriteria';
import { isNullOrUndefined } from 'util';
import { FlightsService } from '../../../../app/flights/services/flights.service';

@Component({
  selector: 'app-search-form',  
  templateUrl: './search-form.component.html'     
})
export class SearchFormComponent implements OnInit, OnDestroy {    
  searchFlightForm: FormGroup;
  depart = [];
  filteredDepart: Observable<string[]>;
  departureLocation = new FormControl();
  companies = [];   
  trips = [];    
  flightTypes = [];
  airports = [];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  movementCodeIndex: number;
  showBack = true;
  showConnection = true;
  company: string;
  flightType: string;
  tripType: string;
  readFileSub: Subscription;
  @Output() onSearch = new EventEmitter<FlightCriteria>();
  @Output() showFlightsList = new EventEmitter<boolean>();
  blueTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#3f51b5',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#B2CDD7',
      dialEditableBackgroundColor:'#000000',
    },
    clockFace: {
      clockFaceBackgroundColor: '#F1F1F1',
      clockHandColor: '#3f51b5',
      clockFaceTimeInactiveColor: '#000000'
    }
  };
  onChangeHour(event) {
    console.log('event', event);
  }
  constructor(private readonly sharedService: SharedService, private readonly flightsService: FlightsService) {

  }
  ngOnDestroy() {
  }
  ngOnInit(): void {
    if (this.sharedService.creationDone === false) {
      this.sharedService.createFlightCriteriaForm();
      this.sharedService.initDropDownLists();
      this.sharedService.creationDone = true;
    }
    this.companies = this.sharedService.companies;
    this.trips = this.sharedService.trips;
    this.flightTypes = this.sharedService.flightTypes;
    this.searchFlightForm = this.sharedService.searchCriteresForm;
    if (this.sharedService.haveResult) {
      this.searchFlight();
    }
    if (!isNullOrUndefined(this.flightsService.flightCriteria)) {
      this.sharedService.bookmarkHaveResult = true;
      this.onSearch.emit(this.flightsService.flightCriteria);
      this.flightsService.flightCriteria = null;
    }
  }

  selectedTripType(value) {
    this.tripType = value;
    if (value === 'ONEWAYTICKET') {
      this.showBack = false;
    }
    else {
      this.showBack = true;
    }
  }
  selectedFlightType(value) {
    this.flightType = value;
    if (value === 'DIRECT') {
      this.showConnection = false;
    }
    else {
      this.showConnection = true;
    }
  }
  selectedCompanyName(value) {
    this.company = value;
  }
  searchFlight() {
    const searchFlightValues = this.searchFlightForm.value;
    if (isNullOrUndefined(searchFlightValues.company) || searchFlightValues.company === '') {
      searchFlightValues.company = null;
    }
    if (isNullOrUndefined(searchFlightValues.flightType) || searchFlightValues.flightType === '') {
      searchFlightValues.flightType = null;
    }
    if (isNullOrUndefined(searchFlightValues.travelType) || searchFlightValues.travelType === '') {
      searchFlightValues.travelType = null;
    }
    this.onSearch.emit(searchFlightValues);
  }
  resetForm(form: FormGroup) {
    this.showFlightsList.emit(false);
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
    this.sharedService.remontedResultSub=null;
  }
}
