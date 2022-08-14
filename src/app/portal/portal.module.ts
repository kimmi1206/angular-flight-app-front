import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideComponent } from './left-side/left-side.component';
import {MatBadgeModule, MatIconModule, MatSelectModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { BotSideComponent } from './bot-side/bot-side.component';
import { TopSideComponent } from './top-side/top-side.component';
import { TopRightSideComponent } from './top-right-side/top-right-side.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LeftSideComponent, BotSideComponent, TopSideComponent, TopRightSideComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    TranslateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule
  ],
  exports: [
    LeftSideComponent, BotSideComponent, TopSideComponent, TopRightSideComponent
  ]
})
export class PortalModule { }
