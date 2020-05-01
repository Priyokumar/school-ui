import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPaymentViewComponent } from './salary-payment-view.component';

describe('SalaryPaymentViewComponent', () => {
  let component: SalaryPaymentViewComponent;
  let fixture: ComponentFixture<SalaryPaymentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryPaymentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryPaymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
