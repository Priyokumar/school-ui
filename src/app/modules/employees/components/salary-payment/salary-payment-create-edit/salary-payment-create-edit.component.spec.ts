import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPaymentCreateEditComponent } from './salary-payment-create-edit.component';

describe('SalaryPaymentCreateEditComponent', () => {
  let component: SalaryPaymentCreateEditComponent;
  let fixture: ComponentFixture<SalaryPaymentCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryPaymentCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryPaymentCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
