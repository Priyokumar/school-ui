import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendenceListComponent } from './student-attendence-list.component';

describe('StudentAttendenceListComponent', () => {
  let component: StudentAttendenceListComponent;
  let fixture: ComponentFixture<StudentAttendenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAttendenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
