import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../app/shared/services/shared.service';

@Component({
  selector: 'app-top-right-side',
  templateUrl: './top-right-side.component.html',
  styleUrls: ['./top-right-side.component.css']
})
export class TopRightSideComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }
  changeContrast(constract: string) {
    localStorage.setItem('constractType', constract);
    this.sharedService.constractType.next(constract);
  }
}
