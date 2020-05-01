import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionfeeStructureListComponent } from './admissionfee-structure-list.component';

describe('AdmissionfeeStructureListComponent', () => {
  let component: AdmissionfeeStructureListComponent;
  let fixture: ComponentFixture<AdmissionfeeStructureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionfeeStructureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionfeeStructureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
