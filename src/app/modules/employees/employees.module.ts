import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeCreateEditComponent } from './components/employee/employee-create-edit/employee-create-edit.component';
import { EmployeeViewComponent } from './components/employee/employee-view/employee-view.component';
import { SharedModule } from '../shared/shared.module';
import {
  EmployeeAttendenceListComponent
} from './components/employee-attendence/employee-attendence-list/employee-attendence-list.component';
import {
  EmployeeAttendenceCreateEditComponent
} from './components/employee-attendence/employee-attendence-create-edit/employee-attendence-create-edit.component';
import {
  EmployeeAttendenceViewComponent
} from './components/employee-attendence/employee-attendence-view/employee-attendence-view.component';
import { SalaryListComponent } from './components/salary/salary-list/salary-list.component';
import { SalaryViewComponent } from './components/salary/salary-view/salary-view.component';
import { SalaryCreateEditComponent } from './components/salary/salary-create-edit/salary-create-edit.component';
import { SalaryPaymentListComponent } from './components/salary-payment/salary-payment-list/salary-payment-list.component';
import { SalaryPaymentViewComponent } from './components/salary-payment/salary-payment-view/salary-payment-view.component';
import {
  SalaryPaymentCreateEditComponent
} from './components/salary-payment/salary-payment-create-edit/salary-payment-create-edit.component';
import { TeachingStaffListComponent } from './components/staff/teaching-staff/teaching-staff-list/teaching-staff-list.component';
import { TeachingStaffViewComponent } from './components/staff/teaching-staff/teaching-staff-view/teaching-staff-view.component';
import {
  TeachingStaffCreateEditComponent
} from './components/staff/teaching-staff/teaching-staff-create-edit/teaching-staff-create-edit.component';
import { CustomDateModule } from '../shared/custom-date.module';
// tslint:disable-next-line: max-line-length
import { EmployeeAttendanceSingleFormComponent } from './components/employee-attendence/employee-attendance-single-form/employee-attendance-single-form.component';
import { EmployeeService } from './services/employee.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EmployeesDialogComponent } from './components/employee/employees-dialog/employees-dialog.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: ':empId/view', component: EmployeeViewComponent },
  { path: 'create', component: EmployeeCreateEditComponent },
  { path: ':empId/edit', component: EmployeeCreateEditComponent },

  // Attendence
  { path: 'attendences', component: EmployeeAttendenceListComponent },
  { path: 'attendences/:empAttdId/view', component: EmployeeAttendenceListComponent },
  { path: 'attendence-create', component: EmployeeAttendenceCreateEditComponent },
  { path: 'attendences/:empAttdId/edit', component: EmployeeAttendenceListComponent },

  // Salary
  { path: 'salaries', component: SalaryListComponent },
  { path: 'salaries/:salId/view', component: SalaryViewComponent },
  { path: 'salary-create', component: SalaryCreateEditComponent },
  { path: 'salaries/:salId/edit', component: SalaryCreateEditComponent },

  // Salary payment
  { path: 'paid-salaries', component: SalaryPaymentListComponent },
  { path: 'paid-salaries/:paySalId/view', component: SalaryPaymentViewComponent },
  { path: 'paid-salary-create', component: SalaryPaymentCreateEditComponent },
  { path: 'paid-salaries/:paySalId/edit', component: SalaryPaymentCreateEditComponent },

  // Teaching staff
  { path: 'teaching-staffs', component: TeachingStaffListComponent },
  { path: ':teachstaffid/teaching-staff-view', component: TeachingStaffViewComponent },
  { path: 'teaching-staff-create', component: TeachingStaffCreateEditComponent },
  { path: ':teachstaffid/teaching-staff-edit', component: TeachingStaffCreateEditComponent },
];

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeCreateEditComponent,
    EmployeeViewComponent,
    EmployeeAttendenceListComponent,
    EmployeeAttendenceCreateEditComponent,
    EmployeeAttendenceViewComponent,
    SalaryListComponent,
    SalaryViewComponent,
    SalaryCreateEditComponent,
    SalaryPaymentListComponent,
    SalaryPaymentViewComponent,
    SalaryPaymentCreateEditComponent,
    TeachingStaffListComponent,
    TeachingStaffViewComponent,
    TeachingStaffCreateEditComponent,
    EmployeeAttendanceSingleFormComponent,
    EmployeesDialogComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CustomDateModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    EmployeeService
  ],
  entryComponents: [EmployeesDialogComponent]
})
export class EmployeesModule { }
