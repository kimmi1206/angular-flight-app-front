import { CompanyName } from '../util/enums/companyName';

export class SynthesisCompany {
    companyName: CompanyName;
    nbFlights: number;
    constructor(companyName: CompanyName, nbFlights: number) {
        this.companyName = companyName;
        this.nbFlights = nbFlights;
    }
}

