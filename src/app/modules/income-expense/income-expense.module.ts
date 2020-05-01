import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IncomeListComponent } from './components/income/income-list/income-list.component';
import { IncomeCreateEditComponent } from './components/income/income-create-edit/income-create-edit.component';
import { IncomeViewComponent } from './components/income/income-view/income-view.component';
import { ExpenseListComponent } from './components/expense/expense-list/expense-list.component';
import { ExpenseCreateEditComponent } from './components/expense/expense-create-edit/expense-create-edit.component';
import { ExpenseViewComponent } from './components/expense/expense-view/expense-view.component';
import { MaterialModule } from '../shared/material/material.module';
import { CustomDateModule } from '../shared/custom-date.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'incomes', component: IncomeListComponent },
  { path: 'incomes/add', component: IncomeCreateEditComponent },
  { path: 'incomes/:id/view', component: IncomeViewComponent },
  { path: 'incomes/:id/edit', component: IncomeCreateEditComponent },

  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/add', component: ExpenseCreateEditComponent },
  { path: 'expenses/:id/view', component: ExpenseViewComponent },
  { path: 'expenses/:id/edit', component: ExpenseCreateEditComponent },

];

@NgModule({
  declarations: [
    IncomeListComponent,
    IncomeCreateEditComponent,
    IncomeViewComponent,
    ExpenseListComponent,
    ExpenseCreateEditComponent,
    ExpenseViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CustomDateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class IncomeExpenseModule { }
