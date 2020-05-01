import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCreateEditComponent } from './expense-create-edit.component';

describe('ExpenseCreateEditComponent', () => {
  let component: ExpenseCreateEditComponent;
  let fixture: ComponentFixture<ExpenseCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
