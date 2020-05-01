import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IAttendanceFormData, IEmployee } from '../../../model/employeeModels';
import * as moment from 'moment';
import { EmployeeService } from '../../../services/employee.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-employee-attendance-single-form]',
  templateUrl: './employee-attendance-single-form.component.html',
  styleUrls: ['./employee-attendance-single-form.component.scss']
})
export class EmployeeAttendanceSingleFormComponent implements OnInit, OnChanges {

  @Input() attendance: IAttendanceFormData;
  @Input() userData: any;
  employee$: Observable<any>;

  constructor(
    private employeService: EmployeeService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {

    this.employeService.receiveSaveInstruction().subscribe(data => {
      if (data) {
        this.save();
      }
    });

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAttendance();
    this.getEmployee();
  }

  getEmployee() {
    this.employee$ = this.employeService.getEmployee(this.attendance.email);
  }


  getAttendance() {
    const date = moment(this.attendance.date).format('MM-DD-YYYY');
    const email = this.attendance.email;
    const url = `${environment.baseUrl}/api/employee-attendances/email/${email}/date/${date}`;

    this.http.get<any>(url).subscribe(data => {
      console.log('Got attendance data ', data);

      if (data.data) {
        this.attendance = data.data;
      }

    },
      error => {
        console.error(error);
      });
  }

  afterTimeInChange(timeIn: string) {

    const timeOut = this.attendance.timeOut;
    if (!timeOut) {
      return;
    }

    const date = this.attendance.date;
    const timeInDateStr = `${date.getFullYear()} ${(date.getMonth() + 1)} ${(date.getDay() + 1)} ${timeIn.toLowerCase()}`;
    const timeInDate = moment(timeInDateStr);

    const timeOutDateStr = `${date.getFullYear()} ${(date.getMonth() + 1)} ${(date.getDay() + 1)} ${timeOut.toLowerCase()}`;
    const timeOutDate = moment(timeOutDateStr);

    const duration = moment.duration(timeOutDate.diff(timeInDate));
    // tslint:disable-next-line: radix
    const hrs = parseInt((duration.asHours() + ''));
    this.attendance.total = `${hrs}hr(s), ${(duration.asMinutes() % 60)}min(s)`;
  }

  afterTimeOutChange(timeOut: string) {

    const timeIn = this.attendance.timeIn;
    if (!timeIn) {
      return;
    }

    const date = this.attendance.date;
    const timeInDateStr = `${date.getFullYear()} ${(date.getMonth() + 1)} ${(date.getDay() + 1)} ${timeIn.toLowerCase()}`;
    const timeInDate = moment(timeInDateStr);

    const timeOutDateStr = `${date.getFullYear()} ${(date.getMonth() + 1)} ${(date.getDay() + 1)} ${timeOut.toLowerCase()}`;
    const timeOutDate = moment(timeOutDateStr);

    const duration = moment.duration(timeOutDate.diff(timeInDate));
    // tslint:disable-next-line: radix
    const hrs = parseInt((duration.asHours() + ''));
    this.attendance.total = `${hrs}hr(s) ${(duration.asMinutes() % 60)}min(s)`;
  }

  save() {
    if (this.attendance.timeIn && this.attendance.timeOut) {

      const payLoad = {
        id: this.attendance.id,
        email: this.attendance.email,
        day: this.attendance.day,
        date: this.attendance.date,
        timeIn: this.attendance.timeIn,
        timeOut: this.attendance.timeOut,
        total: this.attendance.total,
        comment: this.attendance.comment
      };

      const url = environment.baseUrl + '/api/employee-attendances';
      this.http.post(url, payLoad).subscribe(data => {
        console.log('Successfully save attendance');
        this.snackBar.open('Successfully saved data', 'Ok', { duration: 3000 });
        this.getAttendance();
      },
        error => {
          console.error('Error while adding attendance ', error);
          this.snackBar.open('Error while saving data!!!', 'Ok', { duration: 3000 });
        });
    }
  }

  getClass(attendance: IAttendanceFormData) {

    if (attendance.id) {
      return 'submitted-bg';
    } else {
      return 'new-bg';
    }

  }

}
