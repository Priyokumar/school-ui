import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendenceCreateEditComponent } from './student-attendence-create-edit.component';

describe('StudentAttendenceCreateEditComponent', () => {
  let component: StudentAttendenceCreateEditComponent;
  let fixture: ComponentFixture<StudentAttendenceCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAttendenceCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendenceCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
