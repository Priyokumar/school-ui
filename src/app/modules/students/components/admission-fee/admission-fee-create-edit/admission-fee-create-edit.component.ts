import { Component, OnInit } from '@angular/core';
import { Admission } from './admission';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatDialog, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SearchStudentDialogComponent } from '../../search-student-dialog/search-student-dialog.component';
import { Validators } from '@angular/forms';
import { ApiEndpoint, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IAdmission } from '../../../models/admission-fee.model';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';

@Component({
  selector: 'app-admission-fee-create-edit',
  templateUrl: './admission-fee-create-edit.component.html',
  styleUrls: ['./admission-fee-create-edit.component.css']
})
export class AdmissionFeeCreateEditComponent extends Admission implements OnInit {


  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super();
    this.activatedRoute.params.subscribe(params => {
      this.admId = params.id;
      if (this.admId) {
        this.getAdmissionFee();
      }
    });

    this.paidAmountFormCtl.valueChanges.subscribe(data => {

      const admAmout = this.admissionAmountFormCtl.value;
      const paidAmount = data;
      this.dueAmountFormCtl.setValue(admAmout - paidAmount);
      this.promiseToPayDateFormCtl.enable();
      this.promiseToPayDateFormCtl.setValidators(Validators.required);
      this.promiseToPayDateFormCtl.updateValueAndValidity();
      if (admAmout >= paidAmount) {
        this.promiseToPayDateFormCtl.disable();
        this.promiseToPayDateFormCtl.setValidators(null);
        this.promiseToPayDateFormCtl.updateValueAndValidity();
      }
    });
  }

  ngOnInit() {

  }

  getAdmissionFee() {

    this.http.get<any>(ApiEndpoint.ADMISSIONS + '/' + this.admId).subscribe(data => {

      this.admission = data.data;
      if (this.admission) {
        this.fees = this.admission.fees;
        this.feesDataSource = new MatTableDataSource(this.fees);
      }

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

  setForm() {

    this.idFormCtl.setValue(this.admission.id);
    this.admissionRefNoFormCtl.setValue(this.admission.admissionRefNo);
    this.admissionStatusFormCtl.setValue(this.admission.status);
    this.academicYearFormCtl.setValue(this.admission.academicYear);
    this.admissionDateFormCtl.setValue(moment(this.admission.admissionDate as string));
    this.standardFormCtl.setValue(this.admission.standard);
    this.studentStatusFormCtl.setValue(this.admission.student.status);
    this.admissionAmountFormCtl.setValue(this.admission.admissionAmount);
    this.paidAmountFormCtl.setValue(this.admission.paidAmount);
    this.dueAmountFormCtl.setValue(this.admission.dueAmount);
    this.promiseToPayDateFormCtl.setValue(this.admission.promiseToPayDate);

    const student = this.admission.student;
    if (student) {
      this.studIdFormCtl.setValue(student.id);
      this.firstNameFormCtl.setValue(student.firstName);
      this.lastNameFormCtl.setValue(student.lastName);
      this.rollNoFormCtl.setValue(student.rollNo);
      this.registrationNoFormCtl.setValue(student.registrationNo);
      this.registrationDateFormCtl.setValue(student.registrationDate);
    }

    this.fees = this.admission.fees;

  }

  save() {

    const datePipe = new DatePipe('en-US');

    const admissionPayloadData: IAdmission = {
      id: this.idFormCtl.value,
      admissionRefNo: this.admissionRefNoFormCtl.value,
      status: this.admissionStatusFormCtl.value,
      academicYear: this.academicYearFormCtl.value,
      admissionDate: datePipe.transform(this.admissionDateFormCtl.value, 'MM/dd/yyyy'),
      standard: this.standardFormCtl.value,
      admissionAmount: this.admissionAmountFormCtl.value,
      paidAmount: this.paidAmountFormCtl.value,
      dueAmount: this.dueAmountFormCtl.value,
      promiseToPayDate: this.promiseToPayDateFormCtl.value,
      student: {
        correspondentAddress: null,
        dob: null,
        fatherInfo: null,
        firstName: null,
        gender: null,
        bloodGroup: null,
        community: null,
        nationality: null,
        physicallyChallenged: null,
        religion: null,
        profilePic: null,
        status: null,
        aadhaarNo: null,
        guardianInfo: null,
        id: this.studIdFormCtl.value,
        joiningDate: null,
        lastName: null,
        middleName: null,
        motherInfo: null,
        registrationDate: null,
        registrationNo: null,
        rollNo: null,
        standard: null,
        permanentAddress: null,
        sameAsPermAddr: null
      },
      fees: this.fees
    };

    console.log(admissionPayloadData);

    this.saveOrUpdateHttpObservable(this.admId, admissionPayloadData).subscribe(data => {

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
      this.router.navigate(['/admin/students/admissions']);

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });

  }

  private saveOrUpdateHttpObservable(admid: number, admissionPayloadData: IAdmission) {
    if (this.admId) {
      return this.http.put<any>(ApiEndpoint.ADMISSIONS + '/' + admid, admissionPayloadData);
    } else {
      return this.http.post<any>(ApiEndpoint.ADMISSIONS, admissionPayloadData);
    }
  }

  public searchStudent() {
    const dialogRef = this.matDialog.open(SearchStudentDialogComponent, { width: '70%' })
      .afterClosed().subscribe(data => {
        if (data) {
          this.student = data;

          this.registrationDateFormCtl.setValue(moment(this.student.registrationDate as string));
          this.registrationNoFormCtl.setValue(this.student.registrationNo);
          this.studentStatusFormCtl.setValue(this.student.status);
          this.studIdFormCtl.setValue(this.student.id);
          this.firstNameFormCtl.setValue(this.student.firstName);
          this.lastNameFormCtl.setValue(this.student.lastName);

        }
      });
  }

  private generateFees() {

    const acaYear = this.academicYearFormCtl.value;
    const standard = this.standardFormCtl.value;
    this.http.get<any>(ApiEndpoint.ADMISSIONS + '/fees/' + standard + '/' + acaYear).subscribe(data => {

      this.fees = data.data;
      this.feesDataSource = new MatTableDataSource(this.fees);
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

  public onSelectStandard(standard: string) {
    this.paidAmountFormCtl.setValue(null);
    this.dueAmountFormCtl.setValue(null);
    this.getAddmissionFeeMaitenance(standard, this.academicYearFormCtl.value);
    this.generateFees();
  }

  public getAddmissionFeeMaitenance(standard: string, academicYear: string) {

    this.http.get<any>(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE + '/' + standard + '/' + academicYear + '/standard-year').subscribe(data => {

      this.admissionFeeMaintenance = data.data;
      if (this.admissionFeeMaintenance) {
        this.admissionAmountFormCtl.setValue(this.admissionFeeMaintenance.admissionAmount);
      }
    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

  pay(exptdateOfPayment: number) {

  }

}
