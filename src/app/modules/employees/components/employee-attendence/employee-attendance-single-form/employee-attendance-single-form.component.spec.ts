import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendanceSingleFormComponent } from './employee-attendance-single-form.component';

describe('EmployeeAttendanceSingleFormComponent', () => {
  let component: EmployeeAttendanceSingleFormComponent;
  let fixture: ComponentFixture<EmployeeAttendanceSingleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceSingleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendanceSingleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
