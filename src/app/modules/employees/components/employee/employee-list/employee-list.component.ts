import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ApiEndpoint, IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IEmployee } from '../../../model/employeeModels';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  errorMessage: string;
  employeesColumns: string[] = ['firstName', 'middleName', 'lastName', 'empCode', 'employeeType', 'designation', 'status', 'action'];
  employeesDataSource: MatTableDataSource<IEmployee>;
  employees: IEmployee[] = [];
  isSuperAdmin = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.getEmployees();
  }

  private getEmployees() {

    this.http.get<any>(ApiEndpoint.EMPLOYEES).subscribe(data => {
      this.employees = data.data;
      this.employeesDataSource = new MatTableDataSource(this.employees);
    }, err => {
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
      console.error(err);
    });

  }

  public onClickRow(empId: number) {

    this.router.navigate(['admin/employees/' + empId + '/view']);

  }

  public onDeleteEmployee(empId: number) {

    const confirmationData: IConfirmation = {
      title: 'Delete Employee',
      subtitle: 'Are you really sure to delete this employee?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {

          this.http.delete<any>(ApiEndpoint.EMPLOYEES + '/' + empId).subscribe(data => {

            if (data.apiMessage && data.apiMessage.error) {
              this.snackBar.openFromComponent(
                SnackbarInfoComponent,
                {
                  data: SnackBarConfig.dangerData(data.apiMessage.detail),
                  ...SnackBarConfig.flashTopDangerSnackBar()
                });
              return;
            } else {
              this.snackBar.openFromComponent(
                SnackbarInfoComponent,
                {
                  data: SnackBarConfig.successData(data.apiMessage.detail),
                  ...SnackBarConfig.flashTopSuccessSnackBar()
                });
            }

            this.employees = [];
            this.employeesDataSource = new MatTableDataSource([]);
            this.getEmployees();
          }, err => {
            console.error(err);
            if (err.error && err.error.apiMessage) {
              this.errorMessage = err.error.apiMessage.detail;
            } else {
              this.errorMessage = err.message;
            }
            this.snackBar.openFromComponent(
              SnackbarInfoComponent,
              {
                data: SnackBarConfig.dangerData(this.errorMessage),
                ...SnackBarConfig.flashTopDangerSnackBar()
              });
          });
        }
      });
  }

  applyFilter(filterValue: string) {
    if (!this.employeesDataSource) {
      return;
    }
    this.employeesDataSource.filter = filterValue.trim().toLowerCase();
  }

}

interface IBasicEmployeeDetails {
  id: number;
  empCode: string;
  name: string;
  designation: number;
  status: string;
  employeeType: number;
}
