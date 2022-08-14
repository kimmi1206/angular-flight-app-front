import { TestBed } from '@angular/core/testing';

import { FlightsGuard } from './flights.guard';

describe('FlightsGuard', () => {
  let guard: FlightsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FlightsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
