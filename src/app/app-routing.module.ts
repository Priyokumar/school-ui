import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './modules/shared/components/admin-layout/admin-layout.component';

const routes: Routes = [
  { path: '', loadChildren: './modules/auth/auth.module#AuthModule' },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      { path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
      { path: 'employees', loadChildren: './modules/employees/employees.module#EmployeesModule' },
      { path: 'students', loadChildren: './modules/students/students.module#StudentsModule' },
      { path: 'maintenances', loadChildren: './modules/maintenances/maintenances.module#MaintenancesModule' },
      { path: 'incomes-expenses', loadChildren: './modules/income-expense/income-expense.module#IncomeExpenseModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
