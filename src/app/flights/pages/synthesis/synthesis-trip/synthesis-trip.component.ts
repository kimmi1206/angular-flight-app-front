import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { SynthesisTrip } from '../../../../../app/shared/models/synthesisTrip';
import { TravelType } from '../../../../../app/shared/util/enums/travelType';
import { ThemeService } from '../../../../../app/shared/theme/theme.service';
import { isNullOrUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-synthesis-trip',
  templateUrl: './synthesis-trip.component.html',
  styleUrls: ['./synthesis-trip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class SynthesisTripComponent implements OnInit, OnChanges, OnDestroy {
  pieChartLabels: TravelType[] = [];
  pieChartData: number[] = [];
  pieChartType = 'pie';
  totalFlights = 0;
  colors = [];
  colorsSubscription: Subscription;
  @Input()
  synthesisTrips: SynthesisTrip[] = [];
  @Input()
  lang: string;
  constructor(private readonly themeService: ThemeService, private readonly translateService: TranslateService) {
  }
  ngOnDestroy() {
    this.colorsSubscription.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.totalFlights = 0;
    this.synthesisTrips.forEach(row => {
      this.totalFlights = this.totalFlights + row.nbFlights;
    });
    this.synthesisTrips.forEach(row => {
      this.pieChartLabels.push(this.translateService.instant('searchFlightForm.trip.' + row.travelType));
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
