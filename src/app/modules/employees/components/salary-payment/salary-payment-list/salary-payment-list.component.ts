import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { IPaySalary } from '../../../model/employeeModels';
import { ApiEndpoint, IConfirmation } from 'src/app/modules/shared/model/shared.model';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-salary-payment-list',
  templateUrl: './salary-payment-list.component.html',
  styleUrls: ['./salary-payment-list.component.css']
})
export class SalaryPaymentListComponent implements OnInit {

  errorMessage: string;
  public paySalaryColumns: string[] = ['id', 'name', 'payDate', 'paidAmount', 'dueAmount', 'salaryAmount', 'action'];
  public paySalaryDataSource: MatTableDataSource<IPaySalary>;
  public paySalaries: IPaySalary[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.paySalaryDataSource = new MatTableDataSource([]);
    this.getPaySalaries();
  }

  private getPaySalaries() {

    let resp;
    this.http.get(ApiEndpoint.PAY_SALARY).subscribe(data => {

      resp = data;
      console.error('Paid salaries ', resp);
      if (resp && resp.data) {

        this.paySalaries = resp.data;
        this.paySalaryDataSource = new MatTableDataSource(this.paySalaries);
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

  public onClickRow(paySalId: number) {

    this.router.navigate(['/admin/employees/paid-salaries/' + paySalId + '/view']);

  }

  public onDelete(paySalId: number) {

    const confirmationData: IConfirmation = {
      title: 'Delete Salary Payment',
      subtitle: 'Are you really sure to delete this salary payment?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {

          this.http.delete(ApiEndpoint.PAY_SALARY + '/' + paySalId).subscribe(data => {
            this.paySalaries = [];
            this.paySalaryDataSource = new MatTableDataSource([]);
            this.getPaySalaries();
          }, err => {
            console.error(err);
            if (err.error && err.error.apiMessage) {
              this.errorMessage = err.error.apiMessage.detail;
            } else {
              this.errorMessage = err.message;
            }
          });

        }
      });
  }

  public getName(paySalary: IPaySalary) {

    let name = '';
    const emp = paySalary.employeeSalary.employee;
    if (emp) {

      const firstName = emp.firstName || '';
      const middleName = emp.middleName || '';
      const lastName = emp.lastName || '';
      name = firstName + ' ' + middleName + ' ' + lastName;

    }
    return name;
  }

}
