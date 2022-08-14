import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Flight } from '../../../../app/shared/models/flight';
import { SharedService } from 'src/app/shared/services/shared.service';
import { trigger, transition, style, animate, state, query, keyframes } from '@angular/animations';
export type Orientation = ( "prev" | "next" | "none" );

@Component({
  selector: 'app-flight-infos',
  templateUrl: './flight-infos.component.html',
  styleUrls: ['./flight-infos.component.css'],
  animations: [
		trigger(
			"orientAnimation",
			[
				transition(
					"void => prev",
					[
            animate('600ms ease', keyframes([
              style({ transform: 'translateX(-200%)' }),
              style({ transform: 'translateX(0)' })
            ]))
					]
				),
				transition(
					"void => next", 
					[
            animate('600ms ease', keyframes([
              style({ transform: 'translateX(200%)' }),
              style({ transform: 'translateX(0)' })
            ]))
					]
        )
			]
		)
	]
})
export class FlightInfosComponent implements OnInit {
  @Input()
  flightInfos: Flight;
  IsHidden = false;
  orientation:Orientation;
  constructor(private readonly sharedService:SharedService) {
        this.orientation=this.sharedService.orientation;
   }
 
  ngOnInit(): void {

  }

  changeVisibility() {
    this.IsHidden = !this.IsHidden;
  }
}
