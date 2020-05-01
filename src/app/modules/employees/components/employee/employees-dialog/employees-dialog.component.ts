import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IEmployee } from '../../../model/employeeModels';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from 'src/app/modules/shared/model/shared.model';

@Component({
  selector: 'app-employees-dialog',
  templateUrl: './employees-dialog.component.html',
  styleUrls: ['./employees-dialog.component.scss']
})
export class EmployeesDialogComponent implements OnInit {

  employeeDataSource: MatTableDataSource<IEmployee>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  resultsLength = 0;

  employeeColumns: string[] = ['id', 'profilePhoto', 'name', 'designation', 'status'];
  employees: IEmployee[] = [];
  errorMessage: string;
  profilePicUrl = '/assets/images/avatar.png';

  constructor(
    public dialogRef: MatDialogRef<EmployeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient
  ) { }

  ngOnInit() {
    this.employeeDataSource = new MatTableDataSource(this.employees);
    this.getEmployees();
  }

  getEmployees() {
    this.http.get<any>(ApiEndpoint.EMPLOYEES).subscribe(data => {
      this.employees = data.data;
      this.resultsLength = this.employees.length;
      this.employeeDataSource = new MatTableDataSource(this.employees);
      this.employeeDataSource.paginator = this.paginator;
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

  getImageUrl(employee: IEmployee) {

    if (employee.profilePic && employee.profilePic.id) {
      return ApiEndpoint.DOCUMENT + '/' + employee.profilePic.id + '/view';
    } else {
      return this.profilePicUrl;
    }

  }

  applyFilter(filterValue: string) {
    this.employeeDataSource.filter = filterValue.trim().toLowerCase();
  }

  public select(employee: IEmployee) {
    this.dialogRef.close(employee);
  }

  public close() {
    this.dialogRef.close();
  }

}
