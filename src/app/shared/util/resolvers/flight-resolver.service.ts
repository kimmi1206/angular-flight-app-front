import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Flight } from '../../models/flight';
import { Observable } from 'rxjs';
import { FlightsService } from 'src/app/flights/services/flights.service';

@Injectable({
  providedIn: 'root'
})
export class FlightResolverService implements Resolve<Flight>{

  constructor(private flightsService:FlightsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Flight {
    return this.flightsService.flightDetails;
  }
}
