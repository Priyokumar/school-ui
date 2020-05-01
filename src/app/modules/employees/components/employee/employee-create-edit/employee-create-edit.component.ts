import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from './employee';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';
import { ApiEndpoint, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IEmployee, IEmployeeType, IDesignation } from '../../../model/employeeModels';
import { MatSelectChange, MatSnackBar } from '@angular/material';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';

@Component({
  selector: 'app-employee-create-edit',
  templateUrl: './employee-create-edit.component.html',
  styleUrls: ['./employee-create-edit.component.css']
})
export class EmployeeCreateEditComponent extends Employee implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    super();

    this.activatedRoute.params.subscribe(params => {
      this.empId = params.empId;
    });
  }

  ngOnInit() {

    if (this.empId) {
      this.getEmployee();
    }
    this.getEmployeeTypes();

    this.corrCountry.setValue('India');
    this.corrState.setValue('Manipur');
    this.corrDistrict.setValue('Thoubal');
    this.sameAsPermanentAddress.setValue(true);
    this.corrState.disable();
    this.corrCountry.disable();
    this.permtCountry.disable();
    this.permtState.disable();
    this.permtCountry.setValue('India');
    this.permtState.setValue('Manipur');
    this.permtDistrict.setValue('Thoubal');
  }

  private getEmployeeTypes() {
    this.http.get<IEmployeeType[]>(ApiEndpoint.EMPLOYEE_TYPE).subscribe(data => {

      this.employeeTypes = data;

    }, error => {
      console.error(error);
    });
  }

  getEmployee() {

    let resp;
    this.http.get(ApiEndpoint.EMPLOYEES + '/' + this.empId).subscribe(data => {
      resp = data;
      this.employee = resp.data;
      this.setEmployeeForm();
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

  onChangeEmployeeType(name: string) {

    this.designations = this.employeeTypes.find(employeeType => {
      return employeeType.name === name;
    }).designations;

  }

  uploadPhoto(file: File) {
    console.log(file);
  }

  public save() {

    const datePipe = new DatePipe('en-US');
    const employeePayloadData: IEmployee = {
      id: null,
      firstName: this.firstName.value,
      middleName: this.middleName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      mobileNo: this.mobileNo.value,
      dob: datePipe.transform(this.dob.value, 'MM/dd/yyyy'),
      joiningDate: datePipe.transform(this.joiningDate.value, 'MM/dd/yyyy'),
      employeeType: this.employeeType.value,
      designation: this.designation.value,
      status: this.status.value,

      personalInfo: {
        id: this.pid.value,
        panCard: this.panCard.value,
        aadharCard: this.aadharCard.value,
        voterId: this.voterId.value,
        drivingLicence: this.drivingLicence.value
      },
      correspondentAddress: {
        id: this.corAddId.value,
        firstLine: this.corrFirstLine.value,
        secondLine: this.corrSecondLine.value,
        country: this.corrCountry.value,
        state: this.corrState.value,
        district: this.corrDistrict.value
      },
      permanentAddress: {
        id: this.permAddId.value,
        firstLine: this.permtFirstLine.value,
        secondLine: this.permtSecondLine.value,
        country: this.permtCountry.value,
        state: this.permtState.value,
        district: this.permtDistrict.value
      },
      sameAsPermanentAddress: this.sameAsPermanentAddress.value,

      highestQualification: {
        id: this.acaIdFormCtl.value,
        name: this.qualificationNameFormCtl.value,
        board: this.boardFormCtl.value,
        schoolInstitue: this.schoolInstitueFormCtl.value,
        startYear: datePipe.transform(this.startYearFormCtl.value, 'MM/dd/yyyy'),
        passOutYear: datePipe.transform(this.passOutYearFormCtl.value, 'MM/dd/yyyy'),
        score: this.scoreFormCtl.value,
        highestQualification: null,
      },
      lastEmployeeHistory: {
        id: this.empHistIdFormCtl.value,
        employerName: this.employerNameFormCtl.value,
        address: this.addressFormCtl.value,
        startDate: datePipe.transform(this.startDateFormCtl.value, 'MM/dd/yyyy'),
        endDate: datePipe.transform(this.endDateFormCtl.value, 'MM/dd/yyyy'),
        designation: this.empHistDesignationFormCtl.value,
      }
    };

    if (this.empId) {
      employeePayloadData.id = this.empId;
    }

    this.saveOrUpdateHttpObservable(this.empId, employeePayloadData).subscribe((data: any) => {

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

      this.hasSubmitted = true;
      this.router.navigate(['admin/employees/' + data.actionMessage + '/view']);

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

  private saveOrUpdateHttpObservable(empdId: number, employeePayloadData: IEmployee) {
    if (this.empId) {
      return this.http.put(ApiEndpoint.EMPLOYEES + '/' + empdId, employeePayloadData);
    } else {
      return this.http.post(ApiEndpoint.EMPLOYEES, employeePayloadData);
    }
  }

  private setEmployeeForm() {

    this.firstName.setValue(this.employee.firstName);
    this.middleName.setValue(this.employee.middleName);
    this.lastName.setValue(this.employee.lastName);
    this.email.setValue(this.employee.email);
    this.mobileNo.setValue(this.employee.mobileNo);
    if (this.employee.dob) {
      this.dob.setValue(moment(this.employee.dob as string));
    }
    if (this.employee.joiningDate) {
      this.joiningDate.setValue(moment(this.employee.joiningDate as string));
    }

    this.employeeType.setValue(this.employee.employeeType);
    this.status.setValue(this.employee.status);

    this.http.get<IDesignation[]>(ApiEndpoint.EMPLOYEE_TYPE + '/' + this.employee.employeeType + '/designations').subscribe(data => {
      this.designations = data;
      this.designation.setValue(this.employee.designation);
    }, error => {
      console.error(error);
    });

    const pinfo = this.employee.personalInfo;
    if (pinfo) {
      this.pid.setValue(pinfo.id);
      this.panCard.setValue(pinfo.panCard);
      this.aadharCard.setValue(pinfo.aadharCard);
      this.voterId.setValue(pinfo.voterId);
      this.drivingLicence.setValue(pinfo.drivingLicence);
    }

    const corAddr = this.employee.correspondentAddress;
    if (corAddr) {
      this.corAddId.setValue(corAddr.id);
      this.corrFirstLine.setValue(corAddr.firstLine);
      this.corrSecondLine.setValue(corAddr.secondLine);
      this.corrCountry.setValue(corAddr.country);
      this.corrState.setValue(corAddr.state);
      this.corrDistrict.setValue(corAddr.district);
    }
    this.sameAsPermanentAddress.setValue(this.employee.sameAsPermanentAddress);

    const permAddr = this.employee.permanentAddress;
    if (permAddr) {
      this.permAddId.setValue(permAddr.id);
      this.permtFirstLine.setValue(permAddr.firstLine);
      this.permtSecondLine.setValue(permAddr.secondLine);
      this.permtCountry.setValue(permAddr.country ? permAddr.country : 'India');
      this.permtState.setValue(permAddr.state ? permAddr.state : 'Manipur');
      this.permtDistrict.setValue(permAddr.district);
    }

    const highestQualification = this.employee.highestQualification;
    if (highestQualification) {
      this.acaIdFormCtl.setValue(highestQualification.id);
      this.qualificationNameFormCtl.setValue(highestQualification.name);
      this.boardFormCtl.setValue(highestQualification.board);
      this.schoolInstitueFormCtl.setValue(highestQualification.schoolInstitue);
      this.scoreFormCtl.setValue(highestQualification.score);
      if (highestQualification.startYear) {
        this.startYearFormCtl.setValue(moment(highestQualification.startYear as string));
      }
      if (highestQualification.passOutYear) {
        this.passOutYearFormCtl.setValue(moment(highestQualification.passOutYear as string));
      }
    }
    const lastEmployeeHistory = this.employee.lastEmployeeHistory;
    if (lastEmployeeHistory) {
      this.empHistIdFormCtl.setValue(lastEmployeeHistory.id);
      this.employerNameFormCtl.setValue(lastEmployeeHistory.employerName);
      this.addressFormCtl.setValue(lastEmployeeHistory.address);

      if (lastEmployeeHistory.startDate) {
        this.startDateFormCtl.setValue(moment(lastEmployeeHistory.startDate as string));
      }

      if (lastEmployeeHistory.endDate) {
        this.endDateFormCtl.setValue(moment(lastEmployeeHistory.endDate as string));
      }

      this.empHistDesignationFormCtl.setValue(lastEmployeeHistory.designation);
    }
  }

}
