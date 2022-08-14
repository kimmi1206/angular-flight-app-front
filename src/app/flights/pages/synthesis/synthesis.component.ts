import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { SynthesisCriteria } from '../../../../app/shared/models/synthesisCriteria';
import { FlightsService } from '../../services/flights.service';
import { SynthesisCompany } from '../../../../app/shared/models/synthesisCompany';
import { SynthesisTrip } from '../../../../app/shared/models/synthesisTrip';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-synthesis',
  templateUrl: './synthesis.component.html',
  styleUrls: ['./synthesis.component.css']
})
export class SynthesisComponent implements OnInit, OnDestroy {
  isHiddenSearch = false;
  show = false;
  loading = false;
  loading1 = false;
  loading2 = false;
  emptyData = false;
  synthesisCompanies: SynthesisCompany[] = []
  synthesisTrips: SynthesisTrip[] = []
  nbFlights: number;
  synthesisCriteria: SynthesisCriteria;
  headerLabel = 'headers.synthesis.label';
  bdcrumbsLabel = 'bdcrumbs.synthesis.label';
  iconLabel = 'pie_chart';
  showSynthesis = true;
  lang: string;
  subscriptions: Subscription[] = [];
  constructor(private readonly sharedService: SharedService, private readonly flightsService: FlightsService,
    private readonly translateService: TranslateService) {
    this.subscriptions.push(this.sharedService.selectedLanguage.subscribe(lang => {
      this.lang = lang;
    }))
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub =>
      sub.unsubscribe()
    )
  }

  ngOnInit(): void {
    if (this.sharedService.syntheseCreationDone === false)
      this.sharedService.createSynthesisCriteriaForm();
    this.sharedService.syntheseCreationDone = true;

  }
  changeVisibilitySearchForm() {
    this.isHiddenSearch = !this.isHiddenSearch;
  }
  doSynthesis(synthesisCriteria: SynthesisCriteria) {
    this.loading1 = true;
    this.loading2 = true;
    this.loading = true;
    this.synthesisCriteria = synthesisCriteria;
    this.subscriptions.push(this.flightsService.synthesisCompanyFlights(synthesisCriteria).subscribe(synthesisCompanies => {
      this.synthesisCompanies = synthesisCompanies;
      this.loading = false;
    }))
    this.subscriptions.push(this.flightsService.synthesisTripFlights(synthesisCriteria).subscribe(synthesisTrips => {
      this.synthesisTrips = synthesisTrips;
      this.loading2 = false;
    }))
    this.subscriptions.push(this.flightsService.getNumberFlights(synthesisCriteria).subscribe(nbFlights => {
      this.nbFlights = nbFlights;
      this.loading1 = false;
      this.sharedService.syntheseHaveResult = true;
      if (this.nbFlights === 0) {
        this.emptyData = true;
        this.show = false;
      }
      else {
        this.emptyData = false;
        this.show = true;
      }
    }))
  }
}
