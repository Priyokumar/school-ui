import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionfeeStructureCreateEditComponent } from './admissionfee-structure-create-edit.component';

describe('AdmissionfeeStructureCreateEditComponent', () => {
  let component: AdmissionfeeStructureCreateEditComponent;
  let fixture: ComponentFixture<AdmissionfeeStructureCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionfeeStructureCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionfeeStructureCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
