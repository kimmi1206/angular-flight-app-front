import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../../../../../app/shared/services/shared.service';
import { SynthesisCriteria } from '../../../../../app/shared/models/synthesisCriteria';

@Component({
  selector: 'app-synthesis-criteria',
  templateUrl: './synthesis-criteria.component.html',
  styleUrls: ['./synthesis-criteria.component.css']
})
export class SynthesisCriteriaComponent implements OnInit {
  synthesisForm: FormGroup;
  currentDate: Date;
  previousDate: Date;
  @Output() onSearch = new EventEmitter<SynthesisCriteria>();
  constructor(private readonly sharedService: SharedService) { }

  ngOnInit(): void {

    this.synthesisForm = this.sharedService.synthesisForm;
    if (this.sharedService.syntheseHaveResult) {
      this.doSynthesis();
    }
  }
  doSynthesis() {
    const synthesisCriteriaValues = this.synthesisForm.value;
    this.onSearch.emit(synthesisCriteriaValues);
  }
}
