import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { FlightComponent } from '../components/flight/flight.component';

@NgModule({
  declarations: [FlightsComponent, FlightComponent],
  imports: [CommonModule],
  providers: [],
  exports: [FlightComponent],
})
export class FlightsModule {}
