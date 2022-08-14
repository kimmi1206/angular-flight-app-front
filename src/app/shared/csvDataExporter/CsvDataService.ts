import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nDatePipe } from '../util/pipes/i18n-date.pipe';
import { ReplaceNullValuePipe } from '../util/pipes/replace-null-value.pipe';

@Injectable({
    providedIn: 'root'
})
export class CsvDataService {
    locale = '';
    private readonly i18nDatePipe: I18nDatePipe = new I18nDatePipe(this.translateService);
    private readonly replaceNullValuePipe: ReplaceNullValuePipe = new ReplaceNullValuePipe();
    constructor(private readonly translateService: TranslateService) {
    }
    headerList = [this.translateService.instant('flightsList.flightNb.label'),
    this.translateService.instant('flightsList.company.label'),
    this.translateService.instant('flightsList.flight.label'),
    this.translateService.instant('flightsList.trip.label'),
    this.translateService.instant('flightsList.deparDate.label'),
    this.translateService.instant('flightsList.arrivDate.label'),
    this.translateService.instant('flightsList.backDate.label'),
    this.translateService.instant('flightsList.departingFrom.label'),
    this.translateService.instant('flightsList.flightDuration.label'),
    this.translateService.instant('flightsList.connection.label'),
    this.translateService.instant('flightsList.aircraft.label'),
    this.translateService.instant('flightsList.arrivingAt.label')]
    downloadFile(data) {
        const csvData = this.ConvertToCSV(data, this.headerList);
        const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        const dwldLink = document.createElement("a");
        const url = URL.createObjectURL(blob);
        const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", this.translateService.instant('csvExport.filename.label') + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);

    }

    ConvertToCSV(objArray, headerList) {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = 'Id;';

        for (const index in headerList) {
            row += headerList[index] + ';';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for (let i = 0; i < array.length; i++) {
            let line = array[i]["idFlight"] + '';
            for (let index in headerList) {
                const head = headerList[index];
                if (head === this.translateService.instant('flightsList.flightNb.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(array[i]["idFlight"]);
                }
                else if (head === this.translateService.instant('flightsList.company.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(this.translateService.instant('searchFlightForm.company.' + array[i]["companyName"]));
                }
                else if (head === this.translateService.instant('flightsList.flight.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(this.translateService.instant('searchFlightForm.flightType.' + array[i]["flightType"]));
                }
                else if (head === this.translateService.instant('flightsList.trip.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(this.translateService.instant('searchFlightForm.trip.' + array[i]["travelType"]));
                }
                else if (head === this.translateService.instant('flightsList.deparDate.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(this.i18nDatePipe.transform(array[i]["departureDate"]));
                }
                else if (head === this.translateService.instant('flightsList.arrivDate.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(this.i18nDatePipe.transform(array[i]["arrivalDate"]));
                }
                else if (head === this.translateService.instant('flightsList.backDate.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(this.i18nDatePipe.transform(array[i]["backDate"]));
                }
                else if (head === this.translateService.instant('flightsList.departingFrom.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(array[i]["departureLocation"]);
                }
                else if (head === this.translateService.instant('flightsList.flightDuration.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(array[i]["flightDuration"]);
                }
                else if (head === this.translateService.instant('flightsList.connection.label')) {
                    line += ';' + this.replaceNullValuePipe.transform(array[i]["connectionDuration"]);
                }
                else if (head === this.translateService.instant('flightsList.aircraft.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(array[i]["aircraftType"]);
                }
                else if (head === this.translateService.instant('flightsList.arrivingAt.label')) {

                    line += ';' + this.replaceNullValuePipe.transform(array[i]["arrivalLocation"]);
                }
                else {
                    line += ';' + array[i][head];
                }
            }
            str += line + '\r\n';
        }
        return str;
    }
}
