import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { IEmployee, IDocument, IEmployeeType } from '../../../model/employeeModels';
import { ApiEndpoint, IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { FileUploadService } from 'src/app/modules/shared/services/file-upload.service';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  errorMessage: string;
  empId: number;
  employee: IEmployee;

  public documentDisplayedColumns: string[] = ['id', 'name', 'type', 'documentName'];
  public documentDataSource: MatTableDataSource<IDocument>;
  public documents: IDocument[] = [];
  percentage: number;
  uploadingFile: boolean;
  profilePicUrl = '/assets/images/avatar.png';

  panCardUrl: string;
  aadhaarCardUrl: string;
  voterIdUrl: string;
  drivingLicenseUrl: string;
  xCertUrl: string;
  xIICertUrl: string;
  graduationCertUrl: string;
  postGraduationCertUrl: string;

  panCardFile: File;
  aadhaarCardFile: File;
  voterIdFile: File;
  drivingLicenseFile: File;
  xCertFile: File;
  xIICertFile: File;
  graduationCertFile: File;
  postGraduationCertFile: File;

  employeeType = '';
  designation = '';
  isSuperAdmin = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.empId = params.empId;
    });
  }

  ngOnInit() {
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.getEmployee();
  }

  getEmployee() {

    let resp;
    this.http.get(ApiEndpoint.EMPLOYEES + '/' + this.empId).subscribe(data => {
      resp = data;
      this.employee = resp.data;

      this.profilePicUrl = ApiEndpoint.DOCUMENT + '/' + this.employee.profilePic.id + '/view';
      const personalInfo = this.employee.personalInfo;
      if (personalInfo) {
        if (personalInfo.panCardDoc) {
          this.panCardUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.panCardDoc.id + '/view';
        }
        if (personalInfo.aadharCardDoc) {
          this.aadhaarCardUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.aadharCardDoc.id + '/view';
        }
        if (personalInfo.voterIdDoc) {
          this.voterIdUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.voterIdDoc.id + '/view';
        }
        if (personalInfo.drivingLicenceDoc) {
          this.drivingLicenseUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.drivingLicenceDoc.id + '/view';
        }

        if (personalInfo.xCertDoc) {
          this.xCertUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.xCertDoc.id + '/view';
        }
        if (personalInfo.xIICertDoc) {
          this.xIICertUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.xIICertDoc.id + '/view';
        }
        if (personalInfo.graduationCertDoc) {
          this.graduationCertUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.graduationCertDoc.id + '/view';
        }
        if (personalInfo.postGraduationCertDoc) {
          this.postGraduationCertUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.postGraduationCertDoc.id + '/view';
        }
      }

      console.log(this.employee);
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

    const confirmationData: IConfirmation = {
      title: 'Delete Employee',
      subtitle: 'Are you really sure to delete this employee?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {
          this.http.delete<any>(ApiEndpoint.EMPLOYEES + '/' + this.empId).subscribe(data => {

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

            this.router.navigate(['/admin/employees']);
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

  edit() {
    this.router.navigate(['admin/employees/' + this.empId + '/edit']);
  }

  onSelectFile(file: File, type: string) {


    if (type === 'AADHAAR_CARD') {
      this.aadhaarCardFile = file;
    } else if (type === 'PAN_CARD') {
      this.panCardFile = file;
    } else if (type === 'VOTER_ID') {
      this.voterIdFile = file;
    } else if (type === 'DRIVING_LICENSE') {
      this.drivingLicenseFile = file;
    } else if (type === 'X_CERT') {
      this.xCertFile = file;
    } else if (type === 'XII_CERT') {
      this.xIICertFile = file;
    } else if (type === 'GRADUATION_CERT') {
      this.graduationCertFile = file;
    } else if (type === 'POST_GRADUATION_CERT') {
      this.postGraduationCertFile = file;
    }

    this.fileUploadService.uploadDoc(file, this.empId, 'EMPLOYEE', type, type).subscribe(event => {
      console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        this.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {

        this.uploadingFile = false;
        let body: string | any = event.body as string;
        body = JSON.parse(body);

        const docUrl = ApiEndpoint.DOCUMENT + '/' + body.actionMessage + '/view';
        this.setDocUrl(type, docUrl);
        console.log('File has been uploaded');
      }
    }, error => {
      console.error(error);
    });

  }

  setDocUrl(type: string, docUrl: string) {

    if (type === 'PROFILE_PIC') {
      this.profilePicUrl = docUrl;
    } else if (type === 'PAN_CARD') {
      this.panCardUrl = docUrl;
    } else if (type === 'AADHAAR_CARD') {
      this.aadhaarCardUrl = docUrl;
    } else if (type === 'VOTER_ID') {
      this.voterIdUrl = docUrl;
    } else if (type === 'DRIVING_LICENSE') {
      this.drivingLicenseUrl = docUrl;
    } else if (type === 'X_CERT') {
      this.xCertUrl = docUrl;
    } else if (type === 'XII_CERT') {
      this.xIICertUrl = docUrl;
    } else if (type === 'GRADUATION_CERT') {
      this.graduationCertUrl = docUrl;
    } else if (type === 'POST_GRADUATION_CERT') {
      this.postGraduationCertUrl = docUrl;
    }

  }

  editDoc(type: string) {
    if (type === 'PROFILE_PIC') {
      this.profilePicUrl = null;
    } else if (type === 'PAN_CARD') {
      this.panCardUrl = null;
    } else if (type === 'AADHAAR_CARD') {
      this.aadhaarCardUrl = null;
    } else if (type === 'VOTER_ID') {
      this.voterIdUrl = null;
    } else if (type === 'DRIVING_LICENSE') {
      this.drivingLicenseUrl = null;
    } else if (type === 'X_CERT') {
      this.xCertUrl = null;
    } else if (type === 'XII_CERT') {
      this.xIICertUrl = null;
    } else if (type === 'GRADUATION_CERT') {
      this.graduationCertUrl = null;
    } else if (type === 'POST_GRADUATION_CERT') {
      this.postGraduationCertUrl = null;
    }
  }

  cancel(type: string) {
    const personalInfo = this.employee.personalInfo;
    if (personalInfo) {


      if (personalInfo.panCardDoc && type === 'PAN_CARD') {
        this.panCardUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.panCardDoc.id + '/view';
      }

      if (personalInfo.aadharCardDoc && type === 'AADHAAR_CARD') {
        this.aadhaarCardUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.aadharCardDoc.id + '/view';
      }

      if (personalInfo.voterIdDoc && type === 'VOTER_ID') {
        this.voterIdUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.voterIdDoc.id + '/view';
      }

      if (personalInfo.drivingLicenceDoc && type === 'DRIVING_LICENSE') {
        this.drivingLicenseUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.drivingLicenceDoc.id + '/view';
      }


      if (personalInfo.xCertDoc && type === 'X_CERT') {
        this.xCertUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.xCertDoc.id + '/view';
      }

      if (personalInfo.xIICertDoc && type === 'XII_CERT') {
        this.xIICertUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.xIICertDoc.id + '/view';
      }

      if (personalInfo.graduationCertDoc && type === 'GRADUATION_CERT') {
        this.graduationCertUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.graduationCertDoc.id + '/view';
      }

      if (personalInfo.postGraduationCertDoc && type === 'POST_GRADUATION_CERT') {
        this.postGraduationCertUrl = ApiEndpoint.DOCUMENT + '/' + personalInfo.postGraduationCertDoc.id + '/view';
      }
    }
  }

}
