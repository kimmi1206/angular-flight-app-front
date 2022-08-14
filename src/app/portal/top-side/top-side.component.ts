import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-side',
  templateUrl: './top-side.component.html',
  styleUrls: ['./top-side.component.css']
})
export class TopSideComponent implements OnInit {
  
  bdcrumbsResultLabel='bdcrumbs.searchResult.label';
  bdcrumbsDetailsLabel='bdcrumbs.details.label';
  bdcrumbsInflightLabel='bdcrumbs.inflight.label';
  @Input() headerLabel: string;
  @Input() iconLabel: string;
  @Input() bdcrumbsLabel: string;
  @Input() show: boolean;
  @Input() showDetails: boolean;
  @Input() showSynthesis: boolean;
  @Input() showBookmark: boolean;
  @Input() showInflights: boolean;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  goToSearchResult() {
    this.router.navigate(['/flights/search']);
  }
  backToTheFlightDetails() {
    this.router.navigate(['/flights/details']);
  }
}
