import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import { SharedService } from '../../../../app/shared/services/shared.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  constructor(private readonly sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
