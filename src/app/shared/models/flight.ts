import { CabinDetail } from './cabinDetail';
import { FlightType } from '../util/enums/flightType';
import { TravelType } from '../util/enums/travelType';
import { CompanyName } from '../util/enums/companyName';
import { InflightInfo } from './inflightInfo';

export class Flight {
    idFlight: number;
    companyName: CompanyName;
    flightType: FlightType;
    travelType: TravelType;
    departureDate: Date;
    departureTime: Date;
    arrivalDate: Date;
    arrivalTime: Date;
    backDate: Date;
    backTime: Date;
    departureLocation: string;
    arrivalLocation: string;
    flightDuration: Date;
    connectionDuration: Date;
    aircraftType: string;
    cabinDetails: Set<CabinDetail>;
    comforts: Set<String>;
    inflightInfos: Set<InflightInfo>;
}