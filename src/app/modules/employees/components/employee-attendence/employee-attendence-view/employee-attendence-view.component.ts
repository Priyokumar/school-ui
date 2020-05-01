import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmployeeAttendence, IEmployee } from '../../../model/employeeModels';
import { ApiEndpoint } from 'src/app/modules/shared/model/shared.model';

@Component({
  selector: 'app-employee-attendence-view',
  templateUrl: './employee-attendence-view.component.html',
  styleUrls: ['./employee-attendence-view.component.css']
})
export class EmployeeAttendenceViewComponent implements OnInit {


  errorMessage: string;
  empAttdId: string;
  empAttd: IEmployeeAttendence;

  public employeesColumns: string[] = ['id', 'name', 'action'];
  public employeesDataSource: MatTableDataSource<IEmployee>;
  public employees: IEmployee[] = [];

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.empAttdId = params.empAttdId;
    });
  }

  ngOnInit() {
    this.getEmpAttd();
  }

  getEmpAttd() {

    this.http.get(ApiEndpoint.EMPLOYEE_ATTENDENCES + '/' + this.empAttdId).subscribe((data: any) => {

      this.empAttd = data.data;
      this.employees = this.empAttd.employees;
      this.employeesDataSource = new MatTableDataSource(this.employees);

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

  delete() {

    this.http.delete(ApiEndpoint.EMPLOYEE_ATTENDENCES + '/' + this.empAttdId).subscribe(data => {
      this.router.navigate(['/employee/attendences']);
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

  edit() {
    this.router.navigate(['/employee/attendences/' + this.empAttdId + '/edit']);
  }

}
