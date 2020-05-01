import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionFeeViewComponent } from './admission-fee-view.component';

describe('AdmissionFeeViewComponent', () => {
  let component: AdmissionFeeViewComponent;
  let fixture: ComponentFixture<AdmissionFeeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionFeeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionFeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
