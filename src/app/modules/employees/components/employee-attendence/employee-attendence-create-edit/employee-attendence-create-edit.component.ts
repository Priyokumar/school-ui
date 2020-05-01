import { Component, OnInit } from '@angular/core';
import { addDays, addWeeks, subWeeks } from 'date-fns';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { IAttendanceFormData, IEmployee } from '../../../model/employeeModels';
import { Utils } from 'src/app/modules/shared/model/shared.model';
import { EmployeeService } from '../../../services/employee.service';
import { IUser } from 'src/app/modules/shared/model/security';
import { CommonService } from 'src/app/modules/shared/services/common.service';
import { MatDialog } from '@angular/material';
import { EmployeesDialogComponent } from '../../employee/employees-dialog/employees-dialog.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-employee-attendence-create-edit',
  templateUrl: './employee-attendence-create-edit.component.html',
  styleUrls: ['./employee-attendence-create-edit.component.scss']
})
export class EmployeeAttendenceCreateEditComponent implements OnInit {

  currDate = new Date();
  startDate: Date = this.currDate;
  currentDateFctl = new FormControl('', null);
  attendances: IAttendanceFormData[] = [];
  userData: IUser;
  employee: IEmployee;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.currentDateFctl.setValue(this.currDate);
    this.currentDateFctl.valueChanges.subscribe(data => {
      this.getWeekDates(moment(data));
    });
  }

  ngOnInit() {
    const now = moment();
    this.getWeekDates(now);
    this.userData = this.authService.getAuthDataFromCookies();
    console.log('this.userData', this.userData);
  }

  selectEmployee() {
    this.dialog.open(EmployeesDialogComponent, { width: '50%', disableClose: true }).afterClosed().subscribe(data => {
      this.employee = data;
    });
  }

  private getWeekDates(now: moment.Moment) {

    this.attendances = [];
    let day1 = now.startOf('week').toDate();
    day1 = addDays(day1, 1);
    for (let i = 0; i < 6; i++) {
      const day = addDays(day1, i);
      const attendanceForm: IAttendanceFormData = {
        day: Utils.getDay(day.getDay()),
        date: day,
        timeIn: '',
        timeOut: '',
        comment: ''
      };
      this.attendances.push(attendanceForm);
    }
  }

  next() {
    let selectedDate: any = this.currentDateFctl.value;

    if (moment.isMoment(selectedDate)) {
      selectedDate = selectedDate.date();
    }

    const nextDate = addWeeks(selectedDate, 1);
    this.currentDateFctl.setValue(nextDate);
    this.getWeekDates(moment(nextDate));
  }

  previous() {
    let selectedDate: any = this.currentDateFctl.value;
    if (moment.isMoment(selectedDate)) {
      selectedDate = selectedDate.date();
    }
    const prevDate = subWeeks(selectedDate, 1);
    this.currentDateFctl.setValue(prevDate);
    this.getWeekDates(moment(prevDate));
  }

  discard() {
    this.employeeService.sendDiscardInstruction('discard');
  }

  save() {
    this.employeeService.sendSaveInstruction('save');
    console.log(this.attendances);
  }
}


