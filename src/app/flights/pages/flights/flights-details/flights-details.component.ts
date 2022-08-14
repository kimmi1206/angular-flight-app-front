import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../../../../app/flights/services/flights.service';
import { Flight } from '../../../../../app/shared/models/flight';
import { Router, ActivatedRoute, NavigationExtras, Data } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-flights-details',
  templateUrl: './flights-details.component.html',
  styleUrls: ['./flights-details.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
      ]),
      
      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
      ])
    ])  
  ]
})
export class FlightsDetailsComponent implements OnInit {

  constructor(private readonly flightsService: FlightsService, private readonly router: Router, private route: ActivatedRoute) { }
  flightDetails: Flight;
  navigationExtras: NavigationExtras;
  headerLabel = 'headers.details.label';
  bdcrumbsLabel = 'bdcrumbs.search.label';
  showDetails = true;
  iconLabel = 'assignment';
  ngOnInit(): void {
    //this.flightDetails = this.flightsService.flightDetails;
    this.route.data.subscribe((data:Data)=>
    {
      this.flightDetails=data['flightDetails']
      if(!isNullOrUndefined(this.flightDetails)){
        localStorage.setItem('flightDetails', JSON.stringify(this.flightDetails));
        }
    })
    if(isNullOrUndefined(this.flightDetails)){
      this.flightDetails = JSON.parse(localStorage.getItem('flightDetails'));
      localStorage.removeItem('flightDetails');
    }
    this.navigationExtras = {
      state: {
        InflightServices: this.flightDetails.inflightInfos
      },
      relativeTo: this.route
    };
  }
  viewInflightServices() {
    this.router.navigate(['services'], this.navigationExtras);
  }
}  
