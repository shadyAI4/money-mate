import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewExpenseComponent } from './add-new-expense.component';

describe('AddNewExpenseComponent', () => {
  let component: AddNewExpenseComponent;
  let fixture: ComponentFixture<AddNewExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewExpenseComponent]
    });
    fixture = TestBed.createComponent(AddNewExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
