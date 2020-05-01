import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingStaffCreateEditComponent } from './teaching-staff-create-edit.component';

describe('TeachingStaffCreateEditComponent', () => {
  let component: TeachingStaffCreateEditComponent;
  let fixture: ComponentFixture<TeachingStaffCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingStaffCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingStaffCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
