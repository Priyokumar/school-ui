import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendenceCreateEditComponent } from './employee-attendence-create-edit.component';

describe('EmployeeAttendenceCreateEditComponent', () => {
  let component: EmployeeAttendenceCreateEditComponent;
  let fixture: ComponentFixture<EmployeeAttendenceCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAttendenceCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendenceCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
