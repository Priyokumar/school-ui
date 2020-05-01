import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionFeeCreateEditComponent } from './admission-fee-create-edit.component';

describe('AdmissionFeeCreateEditComponent', () => {
  let component: AdmissionFeeCreateEditComponent;
  let fixture: ComponentFixture<AdmissionFeeCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionFeeCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionFeeCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
