import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendenceListComponent } from './employee-attendence-list.component';

describe('EmployeeAttendenceListComponent', () => {
  let component: EmployeeAttendenceListComponent;
  let fixture: ComponentFixture<EmployeeAttendenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAttendenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
