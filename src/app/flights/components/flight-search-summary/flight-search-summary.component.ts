import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-search-summary',
  templateUrl: './flight-search-summary.component.html',
  styleUrls: ['./flight-search-summary.component.css']
})
export class FlightSearchSummaryComponent implements OnInit {
  @Input()
  remontedResult:number;
  constructor() { }
  
  ngOnInit(): void {
  }

}
