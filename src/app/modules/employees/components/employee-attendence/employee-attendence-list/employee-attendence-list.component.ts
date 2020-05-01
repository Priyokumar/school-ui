import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IEmployee, IAttendanceFormData } from '../../../model/employeeModels';
import { ApiEndpoint, Utils } from 'src/app/modules/shared/model/shared.model';
import { CommonService } from 'src/app/modules/shared/services/common.service';
import { addDays, subDays } from 'date-fns';
import { FormControl } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-employee-attendence-list',
  templateUrl: './employee-attendence-list.component.html',
  styleUrls: ['./employee-attendence-list.component.css']
})
export class EmployeeAttendenceListComponent implements OnInit {


  errorMessage: string;
  employees: IEmployee[] = [];
  attendances: IAttendanceFormData[] = [];
  userData: any;
  selectedDate: Date = new Date();
  currentDateFctl = new FormControl('', null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private employeeService: EmployeeService,
  ) {
  }

  ngOnInit() {
    this.currentDateFctl.setValue(this.selectedDate);
    this.getEmpAttds();
    this.userData = this.authService.getAuthDataFromCookies();
  }

  private getEmpAttds() {

    this.http.get<any>(ApiEndpoint.EMPLOYEES).subscribe(data => {

      this.employees = data.data;
      if (!this.employees) {
        this.errorMessage = 'No attendences to display';
      }
      this.generateEmployeeAttendance();
    }, err => {
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
      console.error(err);
    });
  }

  generateEmployeeAttendance() {
    if (this.employees.length > 0) {
      this.getAttendances(this.selectedDate);
    }
  }

  private getAttendances(date: Date) {
    this.attendances = [];
    this.selectedDate = date;
    this.employees.forEach(employee => {
      const attendanceForm: IAttendanceFormData = {
        email: employee.email,
        day: Utils.getDay(date.getDay()),
        date,
        timeIn: '',
        timeOut: '',
        comment: ''
      };
      this.attendances.push(attendanceForm);
    });
  }

  next() {
    this.getAttendances(addDays(this.selectedDate, 1));
  }

  previous() {
    this.getAttendances(subDays(this.selectedDate, 1));
  }

  onChangeDate(event: any) {
    this.getAttendances(event.target.value.toDate());
  }

  save() {
    this.employeeService.sendSaveInstruction('save');
    console.log(this.attendances);
  }

}
