import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxMatTimepickerTheme } from 'ngx-mat-timepicker/lib/models/ngx-mat-timepicker-theme.interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  showConnection = true;
  showBack = true;
  searchFlightForm!: FormGroup;
  timeTheme: NgxMatTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#3f51b5',
      buttonColor: '#fff',
    },
    dial: {
      dialActiveColor: '#B2CDD7',
      dialEditableBackgroundColor: '#000000',
    },
    clockFace: {
      clockFaceBackgroundColor: '#F1F1F1',
      clockHandColor: '#3f51b2',
      clockFaceTimeInactiveColor: '#000000',
    },
  };

  constructor(private readonly sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.createSearchCriteriaForm();
    this.searchFlightForm = this.sharedService.searchCriteriaForm;
  }

  resetForm(form: FormGroup) {
    form.reset();
  }

  searchFlight() {
    const searchFlightValues = this.searchFlightForm;
  }

  selectedTripType(value: string) {
    if (value === 'One-Way ticket') {
      this.showBack = false;
    } else {
      this.showBack = true;
    }
  }

  selectedFlightType(value: string) {
    if (value === 'Direct flight') {
      this.showConnection = false;
    } else {
      this.showConnection = true;
    }
  }
}
