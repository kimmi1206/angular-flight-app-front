import { CabinClass } from '../util/enums/cabinClass';

export class CabinDetail {
    cabinClass: CabinClass;
    bagage: string;
    cancellation: string;
    rebooking: string;
    refund: string;
    fare: number;
}