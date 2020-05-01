import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreateEditComponent } from './employee-create-edit.component';

describe('EmployeeCreateEditComponent', () => {
  let component: EmployeeCreateEditComponent;
  let fixture: ComponentFixture<EmployeeCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
