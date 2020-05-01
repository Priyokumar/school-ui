import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ApiEndpoint, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IStudent } from '../../../models/student.model';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-student-create-edit',
  templateUrl: './student-create-edit.component.html',
  styleUrls: ['./student-create-edit.component.css']
})
export class StudentCreateEditComponent extends Student implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    super();
    this.activatedRoute.params.subscribe(params => {
      this.studId = params.id;
      if (this.studId) {
        this.getStudent();
      }
    });
  }

  ngOnInit() {
    this.getStandards();
    this.sameAsPermAddrFormCtl.setValue(true);
    this.nationalityFormCtl.setValue('Indian');

    this.countryFormCtl.setValue('India');
    this.stateFormCtl.setValue('Manipur');
    this.districtFormCtl.setValue('Thoubal');

    this.countryFormCtl.disable();
    this.stateFormCtl.disable();

    this.corrCountryFormCtl.setValue('India');
    this.corrStateFormCtl.setValue('Manipur');
    this.corrDistrictFormCtl.setValue('Thoubal');

    this.corrCountryFormCtl.disable();
    this.corrStateFormCtl.disable();
  }

  getStandards() {

    this.http.get<any>(ApiEndpoint.STANDARD).subscribe(data => {
      this.standards = data.data;
    }, err => {
      console.error(err);
    });
  }

  getStudent() {

    let resp;
    this.http.get(ApiEndpoint.STUDENTS + '/' + this.studId).subscribe(data => {
      resp = data;
      this.student = resp.data;
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

  save() {

    const datePipe = new DatePipe('en-US');
    const studentPayloadData: IStudent = {
      id: this.idFormCtl.value,
      registrationNo: this.registrationNoFormCtl.value,
      registrationDate: datePipe.transform(this.registrationDateFormCtl.value, 'MM/dd/yyyy'),
      status: this.statusFormCtl.value,
      firstName: this.firstNameFormCtl.value,
      middleName: this.middleNameFormCtl.value,
      lastName: this.lastNameFormCtl.value,
      gender: this.genderFormCtl.value,
      aadhaarNo:null,
      bloodGroup: this.bloodGroupFormCtl.value,
      community: this.communityFormCtl.value,
      nationality: this.nationalityFormCtl.value,
      physicallyChallenged: null,
      religion: this.religionFormCtl.value,
      standard: this.standardFormCtl.value,
      rollNo: this.rollNoFormCtl.value,
      dob: datePipe.transform(this.dobFormCtl.value, 'MM/dd/yyyy'),
      joiningDate: datePipe.transform(this.joiningDateFormCtl.value, 'MM/dd/yyyy'),

      correspondentAddress: {
        id: this.corrAddIdFormCtl.value,
        firstLine: this.corrFirstLineFormCtl.value,
        secondLine: this.corrSecondLineFormCtl.value,
        country: this.corrCountryFormCtl.value,
        state: this.corrStateFormCtl.value,
        district: this.corrDistrictFormCtl.value
      },
      permanentAddress: {
        id: this.addIdFormCtl.value,
        firstLine: this.firstLineFormCtl.value,
        secondLine: this.secondLineFormCtl.value,
        country: this.countryFormCtl.value,
        state: this.stateFormCtl.value,
        district: this.districtFormCtl.value
      },
      sameAsPermAddr: this.sameAsPermAddrFormCtl.value,
      fatherInfo: {
        id: this.fInfoIdFormCtl.value,
        name: this.fatherNameFormCtl.value,
        dob: datePipe.transform(this.fatherDobFormCtl.value, 'MM/dd/yyyy'),
        eduQualification: this.fatherEduQualiFormCtl.value,
        income: this.fatherAnnualIncomeFormCtl.value,
        occupation: this.fatherOccupationFormCtl.value,
        contactNo: this.fatherContactNoFormCtl.value
      },
      motherInfo: {
        id: this.mInfoIdFormCtl.value,
        name: this.motherNameFormCtl.value,
        dob: datePipe.transform(this.motherDobFormCtl.value, 'MM/dd/yyyy'),
        eduQualification: this.motherEduQualiFormCtl.value,
        income: this.motherAnnualIncomeFormCtl.value,
        occupation: this.motherOccupationFormCtl.value,
        contactNo: this.motherContactNoFormCtl.value
      },
      guardianInfo: {
        id: this.gInfoIdFormCtl.value,
        name: this.guardianNameFormCtl.value,
        dob: datePipe.transform(this.guardianDobFormCtl.value, 'MM/dd/yyyy'),
        eduQualification: this.guardianEduQualiFormCtl.value,
        income: this.guardianAnnualIncomeFormCtl.value,
        occupation: this.gaurdianOccupationFormCtl.value,
        contactNo: this.guardianContactNoFormCtl.value
      }
    };

    console.log(studentPayloadData);

    this.saveOrUpdateHttpObservable(this.studId, studentPayloadData).subscribe(data => {

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
      this.router.navigate(['/admin/students']);

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

  private saveOrUpdateHttpObservable(studRegdId: number, studentPayloadData: IStudent) {
    if (this.studId) {
      return this.http.put<any>(ApiEndpoint.STUDENTS + '/' + studRegdId, studentPayloadData);
    } else {
      return this.http.post<any>(ApiEndpoint.STUDENTS, studentPayloadData);
    }
  }

  setForm() {

    this.idFormCtl.setValue(this.student.id);
    this.registrationNoFormCtl.setValue(this.student.registrationNo);
    this.registrationDateFormCtl.setValue(moment(this.student.registrationDate as string));
    this.statusFormCtl.setValue(this.student.status);
    this.firstNameFormCtl.setValue(this.student.firstName);
    this.middleNameFormCtl.setValue(this.student.middleName);
    this.lastNameFormCtl.setValue(this.student.lastName);
    this.standardFormCtl.setValue(this.student.standard);
    this.bloodGroupFormCtl.setValue(this.student.bloodGroup);
    this.genderFormCtl.setValue(this.student.gender);
    this.religionFormCtl.setValue(this.student.religion);
    this.communityFormCtl.setValue(this.student.community);
    this.nationalityFormCtl.setValue(this.student.nationality);
    this.rollNoFormCtl.setValue(this.student.rollNo);
    this.dobFormCtl.setValue(moment(this.student.dob as string));
    this.joiningDateFormCtl.setValue(moment(this.student.joiningDate as string));

    this.sameAsPermAddrFormCtl.setValue(this.student.sameAsPermAddr);

    const permanentAddress = this.student.permanentAddress;
    if (permanentAddress) {
      this.addIdFormCtl.setValue(permanentAddress.id);
      this.firstLineFormCtl.setValue(permanentAddress.firstLine);
      this.secondLineFormCtl.setValue(permanentAddress.secondLine);
      this.countryFormCtl.setValue(permanentAddress.country);
      this.stateFormCtl.setValue(permanentAddress.state);
      this.districtFormCtl.setValue(permanentAddress.district);
    }

    const correspondentAddress = this.student.correspondentAddress;
    if (correspondentAddress) {
      this.corrAddIdFormCtl.setValue(correspondentAddress.id);
      this.corrFirstLineFormCtl.setValue(correspondentAddress.firstLine);
      this.corrSecondLineFormCtl.setValue(correspondentAddress.secondLine);
      this.corrCountryFormCtl.setValue(correspondentAddress.country);
      this.corrStateFormCtl.setValue(correspondentAddress.state);
      this.corrDistrictFormCtl.setValue(correspondentAddress.district);
    }

    const fatherInfo = this.student.fatherInfo;
    if (fatherInfo) {
      this.fInfoIdFormCtl.setValue(fatherInfo.id);
      this.fatherNameFormCtl.setValue(fatherInfo.name);
      if (fatherInfo.dob) {
        this.fatherDobFormCtl.setValue(moment(fatherInfo.dob as string));
      }
      this.fatherContactNoFormCtl.setValue(fatherInfo.contactNo);
      this.fatherAnnualIncomeFormCtl.setValue(fatherInfo.income);
      this.fatherEduQualiFormCtl.setValue(fatherInfo.eduQualification);
      this.fatherOccupationFormCtl.setValue(fatherInfo.occupation);
    }

    const motherInfo = this.student.motherInfo;
    if (motherInfo) {
      this.mInfoIdFormCtl.setValue(motherInfo.id);
      this.motherNameFormCtl.setValue(motherInfo.name);
      if (motherInfo.dob) {
        this.motherNameFormCtl.setValue(moment(motherInfo.dob as string));
      }
      this.motherContactNoFormCtl.setValue(motherInfo.contactNo);
      this.motherAnnualIncomeFormCtl.setValue(motherInfo.income);
      this.motherEduQualiFormCtl.setValue(motherInfo.eduQualification);
      this.motherOccupationFormCtl.setValue(motherInfo.occupation);
    }

    const guardianInfo = this.student.guardianInfo;
    if (guardianInfo) {
      this.gInfoIdFormCtl.setValue(guardianInfo.id);
      this.guardianNameFormCtl.setValue(guardianInfo.name);
      if (guardianInfo.dob) {
        this.guardianDobFormCtl.setValue(moment(guardianInfo.dob as string));
      }
      this.guardianContactNoFormCtl.setValue(guardianInfo.contactNo);
      this.guardianAnnualIncomeFormCtl.setValue(guardianInfo.income);
      this.guardianEduQualiFormCtl.setValue(guardianInfo.eduQualification);
      this.gaurdianOccupationFormCtl.setValue(guardianInfo.occupation);
    }
  }

}
