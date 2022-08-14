import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCriteriaComponent } from './contact-criteria.component';

describe('ContactCriteriaComponent', () => {
  let component: ContactCriteriaComponent;
  let fixture: ComponentFixture<ContactCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
