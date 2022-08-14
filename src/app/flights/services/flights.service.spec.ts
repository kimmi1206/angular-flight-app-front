import { TestBed, getTestBed } from '@angular/core/testing';

import { FlightsService } from './flights.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SynthesisCompany } from 'src/app/shared/models/synthesisCompany';
import { CompanyName } from 'src/app/shared/util/enums/companyName';
import { RouterTestingModule } from '@angular/router/testing';
import { SynthesisCriteria } from 'src/app/shared/models/synthesisCriteria';

describe('FlightsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: FlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [FlightsService]
    });
    injector = getTestBed();
    service = injector.get(FlightsService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('#synthesisCompanyFlights', () => {
    it('should return an Observable<SynthesisCompany[]>', () => {
      const dummySynthesisCompanys: SynthesisCompany[] = [
        new SynthesisCompany(CompanyName.EMIRATES, 2),
        new SynthesisCompany(CompanyName.AIRFRANCE, 4)
      ];

       service.synthesisCompanyFlights(new SynthesisCriteria(null,new Date())).subscribe(synthesis => {
        expect(synthesis.length).toBe(2);
        expect(synthesis).toEqual(dummySynthesisCompanys);
      }); 

      const req = httpMock.expectOne(`${service.FLIGHTS_URL}/syntheseCompanyFlights`);
      expect(req.request.method).toBe('POST');
      req.flush(dummySynthesisCompanys);
    });
  });
});
