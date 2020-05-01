import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStudentDialogComponent } from './search-student-dialog.component';

describe('SearchStudentDialogComponent', () => {
  let component: SearchStudentDialogComponent;
  let fixture: ComponentFixture<SearchStudentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStudentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
