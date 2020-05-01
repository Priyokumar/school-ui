import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeCreateEditComponent } from './income-create-edit.component';

describe('IncomeCreateEditComponent', () => {
  let component: IncomeCreateEditComponent;
  let fixture: ComponentFixture<IncomeCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
