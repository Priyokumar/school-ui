import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingStaffViewComponent } from './teaching-staff-view.component';

describe('TeachingStaffViewComponent', () => {
  let component: TeachingStaffViewComponent;
  let fixture: ComponentFixture<TeachingStaffViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingStaffViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingStaffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
