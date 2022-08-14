import { TestBed } from '@angular/core/testing';

import { FlightResolverService } from './flight-resolver.service';

describe('FlightResolverService', () => {
  let service: FlightResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
