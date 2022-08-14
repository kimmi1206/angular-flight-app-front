export class SynthesisCriteria {
    departureDateMin: Date;
    departureDateMax: Date;
    constructor(departureDateMin: Date,departureDateMax: Date){
      this.departureDateMin=departureDateMin;
      this.departureDateMax=departureDateMax;
    }
}