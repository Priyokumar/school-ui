import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingStaffListComponent } from './teaching-staff-list.component';

describe('TeachingStaffListComponent', () => {
  let component: TeachingStaffListComponent;
  let fixture: ComponentFixture<TeachingStaffListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingStaffListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
