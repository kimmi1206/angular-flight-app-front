import { Injectable } from '@angular/core';
import { CompanyName } from '../util/enums/companyName';
import { TravelType } from '../util/enums/travelType';
import { FlightType } from '../util/enums/flightType';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Orientation } from 'src/app/flights/components/flight-infos/flight-infos.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  companies = [];
  trips = [];
  flightTypes = [];
  airports = [];
  haveResult :boolean;
  bookmarkHaveResult :boolean;
  syntheseHaveResult :boolean;
  creationDone =false;
  syntheseCreationDone =false;
  currentDate: Date;
  previousDate: Date;
  constractType = new Subject<string>();
  selectedLanguage = new Subject<string>();
  remontedResultSub:number;
  orientation:Orientation;
  private _synthesisForm: FormGroup;
  public get synthesisForm(): FormGroup {
    return this._synthesisForm;
  }
  public set synthesisForm(value: FormGroup) {
    this._synthesisForm = value;
  }
  private _searchCriteresForm: FormGroup;
  public get searchCriteresForm(): FormGroup {
    return this._searchCriteresForm;
  }
  public set searchCriteresForm(value: FormGroup) {
    this._searchCriteresForm = value;
  }

  constructor(private http: HttpClient) { }

  initDropDownLists() {
    const companyKeys = Object.keys(CompanyName);
    this.companies = companyKeys.slice(companyKeys.length / 2);

    const tripKeys = Object.keys(TravelType);
    this.trips = tripKeys.slice(tripKeys.length / 2);

    const flightTypesKeys = Object.keys(FlightType);
    this.flightTypes = flightTypesKeys.slice(flightTypesKeys.length / 2);
  }

  createFlightCriteriaForm() {
    this._searchCriteresForm = new FormGroup({
      company: new FormControl(''),
      flightType: new FormControl(''),
      travelType: new FormControl(''),
      departureLocation: new FormControl(''),
      arrivalLocation: new FormControl(''),
      departureDateMin: new FormControl(''),
      arrivalDateMin: new FormControl(''),
      backDateMin: new FormControl(''),
      departureTimeMin: new FormControl(''),
      arrivalTimeMin: new FormControl(''),
      backTimeMin: new FormControl(''),
      flightDurationMin: new FormControl(''),
      connectionDurationMin: new FormControl(''),
      departureDateMax: new FormControl(''),
      arrivalDateMax: new FormControl(''),
      backDateMax: new FormControl(''),
      departureTimeMax: new FormControl(''),
      arrivalTimeMax: new FormControl(''),
      backTimeMax: new FormControl(''),
      flightDurationMax: new FormControl(''),
      connectionDurationMax: new FormControl(''),
      aircraftType: new FormControl(''),  
      fareMin: new FormControl(''),
      fareMax: new FormControl('')
    });
  }
  createSynthesisCriteriaForm() {
    this.currentDate = new Date();
    this.previousDate = new Date();
    this.previousDate.setMonth(new Date().getMonth() - 1);
    this._synthesisForm = new FormGroup({
      departureDateMin: new FormControl(this.previousDate),
      departureDateMax: new FormControl(this.currentDate)
    });
  }
}
