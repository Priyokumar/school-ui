import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { IPaySalary, IEmployee, IEmployeeSalary } from '../../../model/employeeModels';
import { ApiEndpoint } from 'src/app/modules/shared/model/shared.model';
import { EmployeesDialogComponent } from '../../employee/employees-dialog/employees-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-salary-payment-create-edit',
  templateUrl: './salary-payment-create-edit.component.html',
  styleUrls: ['./salary-payment-create-edit.component.css']
})
export class SalaryPaymentCreateEditComponent implements OnInit {

  paySalaryId: number;
  errorMessage: string;

  paySalaryForm: FormGroup;
  paySalary: IPaySalary;
  employees: IEmployee[] = [];
  selectedEmployeeSalary: IEmployeeSalary;

  idFormCtl = new FormControl('', null);
  nameFormCtl = new FormControl('', Validators.required);
  payDateFormCtl = new FormControl('', Validators.required);
  paidAmountFormCtl = new FormControl('', Validators.required);
  dueAmountFormCtl = new FormControl('', null);
  salaryAmountFormCtl = new FormControl('', Validators.required);
  employeeFormCtl = new FormControl('', Validators.required);
  employee: IEmployee;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {

    this.paySalaryForm = new FormGroup({

      employeeFormCtl: this.employeeFormCtl,
      payDateFormCtl: this.payDateFormCtl,
      paidAmountFormCtl: this.paidAmountFormCtl,
      dueAmountFormCtl: this.dueAmountFormCtl,
      salaryAmountFormCtl: this.salaryAmountFormCtl,

    });

    this.activatedRoute.params.subscribe(params => {
      this.paySalaryId = params.paySalId;
      if (this.paySalaryId) {
        this.getPaySalary();
      }
    });

    this.paidAmountFormCtl.valueChanges.subscribe(paidAmount => {

      const salaryAmount = this.salaryAmountFormCtl.value;
      this.dueAmountFormCtl.setValue(salaryAmount - paidAmount);

    });
  }

  ngOnInit() {
    this.payDateFormCtl.setValue(new Date())
    this.getEmployees();
  }

  public getPaySalary(): any {
    this.http.get(ApiEndpoint.PAY_SALARY + '/' + this.paySalaryId).subscribe((data: any) => {
      this.paySalary = data.data;
      this.setForm();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

  private getEmployees() {
    this.http.get(ApiEndpoint.EMPLOYEES).subscribe((data: any) => {
      this.employees = data.data;
    }, err => {
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
      console.error(err);
    });
  }

  public save() {

    const datePipe = new DatePipe('en-US');
    const paySalaryPayload: IPaySalary = {

      id: this.idFormCtl.value,
      payDate: datePipe.transform(this.payDateFormCtl.value, 'MM/dd/yyyy'),
      dueAmount: this.dueAmountFormCtl.value,
      employeeSalary: this.selectedEmployeeSalary,
      paidAmount: this.paidAmountFormCtl.value

    };

    this.saveOrUpdateHttpObservable(paySalaryPayload).subscribe((data: any) => {

      const apiMessage = data.apiMessage;

      if (apiMessage.error) {
        this.errorMessage = apiMessage.detail;
        return;
      }

      this.router.navigate(['/admin/employees/paid-salaries']);
    }, err => {

      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

  private saveOrUpdateHttpObservable(paySalaryPayload: IPaySalary) {

    if (this.paySalaryId) {
      return this.http.put(ApiEndpoint.PAY_SALARY + '/' + this.paySalaryId, paySalaryPayload);
    } else {
      return this.http.post(ApiEndpoint.PAY_SALARY, paySalaryPayload);
    }
  }

  public setForm() {

    this.idFormCtl.setValue(this.paySalary.id);
    this.payDateFormCtl.setValue(moment(this.paySalary.payDate as string));
    this.paidAmountFormCtl.setValue(this.paySalary.paidAmount);
    this.dueAmountFormCtl.setValue(this.paySalary.dueAmount);

    const empSalary = this.paySalary.employeeSalary;
    if (empSalary) {
      this.salaryAmountFormCtl.setValue(empSalary.salaryAmount);

      const emp = empSalary.employee;
      if (emp) {

        const firstName = emp.firstName || '';
        const middleName = emp.middleName || '';
        const lastName = emp.lastName || '';
        this.nameFormCtl.setValue(firstName + ' ' + middleName + ' ' + lastName);
        this.employeeFormCtl.setValue(emp.id);
      }
    }
  }

  public onSelectEmployee(selectedEmployeeId: number) {

    const employee = this.employees.find(elmnt => elmnt.id === selectedEmployeeId);
    const firstName = employee.firstName || '';
    const middleName = employee.middleName || '';
    const lastName = employee.lastName || '';
    this.nameFormCtl.setValue(firstName + ' ' + middleName + ' ' + lastName);

    this.getEmployeeSalaryByEmpId(employee.id);
  }

  private getEmployeeSalaryByEmpId(empId: number) {
    this.http.get(ApiEndpoint.EMPLOYEE_SALARY + '/' + empId + '/employee').subscribe((data: any) => {
      this.selectedEmployeeSalary = data.data;
      if (this.selectedEmployeeSalary) {
        this.salaryAmountFormCtl.setValue(this.selectedEmployeeSalary.salaryAmount);
        this.paidAmountFormCtl.setValue(this.selectedEmployeeSalary.salaryAmount);
      }
    }, err => {
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
      console.error(err);
    });
  }

  openEmployeeDialog() {
    this.dialog.open(EmployeesDialogComponent, { width: '50%', disableClose: true }).afterClosed().subscribe(data => {
      this.employee = data;
      const fullName = `${this.employee.firstName} ${this.employee.middleName} ${this.employee.lastName}`;
      this.employeeFormCtl.setValue(fullName);
      this.getEmployeeSalaryByEmpId(this.employee.id);
    });
  }

}
