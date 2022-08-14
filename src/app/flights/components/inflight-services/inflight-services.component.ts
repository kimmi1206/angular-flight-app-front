import { Component, OnInit,HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InflightInfo } from '../../../../app/shared/models/inflightInfo';
import { trigger, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-inflight-services',
  templateUrl: './inflight-services.component.html',
  styleUrls: ['./inflight-services.component.css'],
  animations: [  
    trigger("show", [
     state('true',style({'z-index': '99 !important'
    })),
     state('false',style({zoom: '0%'}))
    ]),
  ]  
})
export class InflightServicesComponent implements OnInit {
  InflightServices: Set<InflightInfo>;
  headerLabel = 'headers.inflight.label';
  bdcrumbsLabel = 'bdcrumbs.search.label';
  showInflights = true;
  iconLabel = 'bookmark';
  clicked=false;
  clickedTitle:String;
  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {
    this.InflightServices = this.router.getCurrentNavigation().extras.state.InflightServices;
  }
  ngOnInit(): void {

  }
  backToTheFlightDetails() {
    this.router.navigate(['/flights/details']);
  }
  cardClicked(title:String,el: HTMLElement){
    this.clicked=true;
    this.clickedTitle=title;
    el.scrollIntoView();
  }
  close(){
    this.clicked=false;
    this.clickedTitle=null;
  }
}  
