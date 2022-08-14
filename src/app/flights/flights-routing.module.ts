import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FlightsDetailsComponent } from './pages/flights/flights-details/flights-details.component';
import { FlightsPageComponent } from './pages/flights/flights-page/flights-page.component';
import { InflightServicesComponent } from './components/inflight-services/inflight-services.component';
import { SynthesisComponent } from './pages/synthesis/synthesis.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FlightResolverService } from '../shared/util/resolvers/flight-resolver.service';

const routes: Routes = [
  {
    path: 'search',
    component: FlightsPageComponent
  },
  {
    path: 'details',
    component: FlightsDetailsComponent,
    resolve: { flightDetails: FlightResolverService }
  },
  {
    path: 'details/services',
    component: InflightServicesComponent
  },
  {
    path: 'synthesis',
    component: SynthesisComponent
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class FlightsRoutingModule { }