import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionFeeListComponent } from './admission-fee-list.component';

describe('AdmissionFeeListComponent', () => {
  let component: AdmissionFeeListComponent;
  let fixture: ComponentFixture<AdmissionFeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionFeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionFeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
