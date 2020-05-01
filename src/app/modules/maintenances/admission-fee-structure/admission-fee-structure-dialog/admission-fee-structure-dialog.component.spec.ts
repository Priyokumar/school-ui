import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionFeeStructureDialogComponent } from './admission-fee-structure-dialog.component';

describe('AdmissionFeeStructureDialogComponent', () => {
  let component: AdmissionFeeStructureDialogComponent;
  let fixture: ComponentFixture<AdmissionFeeStructureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionFeeStructureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionFeeStructureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
