import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCreateEditComponent } from './class-create-edit.component';

describe('ClassCreateEditComponent', () => {
  let component: ClassCreateEditComponent;
  let fixture: ComponentFixture<ClassCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
