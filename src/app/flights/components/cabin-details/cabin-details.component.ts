import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Flight } from '../../../../app/shared/models/flight';
import { CabinDetail } from '../../../../app/shared/models/cabinDetail';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { SharedService } from 'src/app/shared/services/shared.service';
type Orientation = ( "prev" | "next" | "none" );

@Component({
  selector: 'app-cabin-details',
  templateUrl: './cabin-details.component.html',
  styleUrls: ['./cabin-details.component.css'],
  animations: [
		trigger(
			"orientAnimation",
			[
        transition(
					"void => prev", // ---> Entering --->
					[
            animate('600ms ease', keyframes([
              style({ transform: 'translateX(-200%)' }),
              style({ transform: 'translateX(0)' })
            ]))
					]
				),
				transition(
					"void => next", // <--- Entering <---
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
export class CabinDetailsComponent implements OnInit {
  @Input()
  flightInfos: Flight;
  cabinDetails: Set<CabinDetail>;
  IsHidden = false;
  orientation:Orientation;
  constructor(private readonly sharedService:SharedService) {
    this.orientation=this.sharedService.orientation;
   }

  ngOnInit(): void {
    this.cabinDetails = this.flightInfos.cabinDetails;
  }

  changeVisibility() {
    this.IsHidden = !this.IsHidden;
  }
}
