import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionfeeStructureViewComponent } from './admissionfee-structure-view.component';

describe('AdmissionfeeStructureViewComponent', () => {
  let component: AdmissionfeeStructureViewComponent;
  let fixture: ComponentFixture<AdmissionfeeStructureViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionfeeStructureViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionfeeStructureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
