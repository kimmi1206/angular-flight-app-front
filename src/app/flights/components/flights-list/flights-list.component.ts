import { Component, OnInit, ViewChild, Input, TemplateRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Flight } from '../../../../app/shared/models/flight';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FlightsService } from '../../services/flights.service';
import { CsvDataService } from '../../../../app/shared/csvDataExporter/CsvDataService';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {
  @Input()
  flights = new MatTableDataSource<Flight>();
  selectedFlights = new MatTableDataSource<Flight>();
  flightsTemp = new MatTableDataSource<Flight>();
  displayBackButton = false;
  title: string;
  @Output() bookmarkTitle = new EventEmitter<string>();
  displayedColumns: string[] = [
    'companyName',
    'flightType',
    'travelType',
    'departureDate',
    'departureTime',
    'arrivalDate',
    'arrivalTime',
    'backDate',
    'backTime',
    'departureLocation',
    'arrivalLocation',
    'select'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  selection = new SelectionModel<Flight>(true, []);
  flightsIds: number[] = [];

  constructor(private readonly flightsService: FlightsService, private dialog: MatDialog, private readonly csvDataService: CsvDataService) {
  }

  ngOnInit(): void {
    this.flights.paginator = this.paginator;
    this.flights.sort = this.matSort;
    for (const flight of this.flights.data) {
      this.flightsIds.push(flight.idFlight);
    }
    this.flightsService.flightsIds = this.flightsIds;
    this.flightsTemp = this.flights;
  }
  getFlight(idFlight: number) {
    this.flightsService.getFlightDetails(idFlight);
  }
  addRow(row?: Flight) {
    if (!this.ifRowExist(row)) {
      this.selectedFlights.data.push(row);
    }
  }
  ifRowExist(row?: Flight): boolean | undefined {
    for (let i = 0; i < this.selectedFlights.data.length; ++i) {
      if (this.selectedFlights.data[i].idFlight === row.idFlight) {
        this.selectedFlights.data.splice(i, 1);
        return true;
      }
    }
  }
  getSelectedFlights() {
    this.selectedFlights.paginator = this.paginator;
    this.flights = this.selectedFlights;
    this.displayBackButton = true;
  }
  backToResultList() {
    this.flightsTemp.paginator = this.paginator;
    this.flights = this.flightsTemp;
    this.displayBackButton = false;
  }
  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }
  addBookmark() {
    this.bookmarkTitle.emit(this.title);
  }
  exportCsv() {
    this.csvDataService.downloadFile(this.flights.data);
  }
}
