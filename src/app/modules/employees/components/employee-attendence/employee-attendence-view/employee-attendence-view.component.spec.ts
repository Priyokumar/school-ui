import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendenceViewComponent } from './employee-attendence-view.component';

describe('EmployeeAttendenceViewComponent', () => {
  let component: EmployeeAttendenceViewComponent;
  let fixture: ComponentFixture<EmployeeAttendenceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAttendenceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendenceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
