import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SynthesisCompany } from '../../../../../app/shared/models/synthesisCompany';
import { CompanyName } from '../../../../../app/shared/util/enums/companyName';
import { ThemeService } from '../../../../shared/theme/theme.service';
import { isNullOrUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-synthesis-summary',
  templateUrl: './synthesis-summary.component.html',
  styleUrls: ['./synthesis-summary.component.css'],
  animations: [
    trigger(
      "pieAnimation",
      [
        transition(":enter", [
          animate('3s ease', keyframes([
            style({ transform: 'scale(0) rotate(-180deg)' }),
            style({ transform: 'scale(-1) rotate(180deg)' })
          ])),
        ]
        )
        /*         query(    
                  ":leave",
                  [
                    animate('2000ms ease', keyframes([
                      style({ transform: 'scale(1)', offset: 0 }),
                      style({ transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35 }),
                      style({ opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1 }),
                    ])),          ],
                  { optional: true }
                ) */
      ]),
    trigger(
      "tableAnimation",
      [
        transition(":enter", [
          animate('1000ms ease-in-out', keyframes([
            style({ transform: 'translateX(-200%)' }),
            style({ transform: 'translateX(0)' })
          ]))
        ]
        )
        /*         query(    
                  ":leave",
                  [
                    animate('2000ms ease', keyframes([
                      style({ transform: 'scale(1)', offset: 0 }),
                      style({ transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35 }),
                      style({ opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1 }),
                    ])),          ],
                  { optional: true }   
                ) */
      ])
  ]
})
export class SynthesisSummaryComponent implements OnInit, OnChanges, OnDestroy {
  pieChartLabels: CompanyName[] = [];
  pieChartData: number[] = [];
  pieChartType = 'pie';
  totalFlights = 0;
  colors = [];
  colorsSubscription: Subscription;
  @Input()
  synthesisCompanies: SynthesisCompany[] = [];
  constructor(private readonly themeService: ThemeService, private readonly translateService: TranslateService) { }
  ngOnDestroy() {
    this.colorsSubscription.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.totalFlights = 0;
    this.synthesisCompanies.forEach(row => {
      this.totalFlights = this.totalFlights + row.nbFlights;
    });
    this.synthesisCompanies.forEach(row => {
      this.pieChartLabels.push(this.translateService.instant('searchFlightForm.company.' + row.companyName));
      this.pieChartData.push(+((row.nbFlights / this.totalFlights) * 100).toFixed(2));
    });
  }
  ngOnInit(): void {
    this.colorsSubscription = this.themeService.colorsSub.subscribe(colors => {
      this.colors = colors;
    })
    const constract = localStorage.getItem('constractType');
    if (constract === 'high') {
      this.colors = [
        {
          backgroundColor: [
            '#03257A',
            '#EEEEEE',
            '#D3D3D3'
          ]
        }
      ];
    }
    else if (isNullOrUndefined(constract) || (constract === 'normal')) {
      this.colors = [
        {
          backgroundColor: [
            '#3f51b5',
            '#EAF9FF',
            '#B2CDD7'
          ]
        }
      ];
    }
  }

}
