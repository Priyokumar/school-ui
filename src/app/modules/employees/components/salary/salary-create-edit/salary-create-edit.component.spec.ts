import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCreateEditComponent } from './salary-create-edit.component';

describe('SalaryCreateEditComponent', () => {
  let component: SalaryCreateEditComponent;
  let fixture: ComponentFixture<SalaryCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
