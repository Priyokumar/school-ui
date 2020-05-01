import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { IStudent } from '../../../models/student.model';
import { ApiEndpoint, IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { FileUploadService } from 'src/app/modules/shared/services/file-upload.service';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  errorMessage: string;
  studId: string;
  student: IStudent;
  percentage: number;
  uploadingFile: boolean;
  profilePicUrl = '../../../../../../assets/images/avatar.png';
  isSuperAdmin = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private fileUploadService: FileUploadService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.studId = params.id;
    });
  }

  ngOnInit() {
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.getStudent();
  }

  getStudent() {

    let resp;
    this.http.get(ApiEndpoint.STUDENTS + '/' + this.studId).subscribe(data => {
      resp = data;
      this.student = resp.data;
      if (this.student.profilePic) {
        this.profilePicUrl = ApiEndpoint.DOCUMENT + '/' + this.student.profilePic.id + '/view';
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

  delete() {
    const confirmationData: IConfirmation = {
      title: 'Delete Student',
      subtitle: 'Are you really sure to delete this student?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {
          this.http.delete<any>(ApiEndpoint.STUDENTS + '/' + this.studId).subscribe(data => {
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
      });
  }

  edit() {
    this.router.navigate(['/admin/students/' + this.studId + '/edit']);
  }

  onSelectFile(file: File) {

    this.fileUploadService.uploadDoc(file, this.studId, 'STUDENT', 'PROFILE_PIC', 'PROFILE_PIC').subscribe(event => {
      console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        this.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {

        this.uploadingFile = false;
        let body: string | any = event.body as string;
        body = JSON.parse(body);

        const docUrl = ApiEndpoint.DOCUMENT + '/' + body.actionMessage + '/view';
        this.profilePicUrl = docUrl;
        console.log('File has been uploaded');
      }
    }, error => {
      console.error(error);
    });

  }

}
