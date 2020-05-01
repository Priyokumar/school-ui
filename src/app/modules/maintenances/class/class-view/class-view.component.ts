import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoint, IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IStandard } from '../../model/standard';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.css']
})
export class ClassViewComponent implements OnInit {

  standardId: number;
  standard: IStandard;
  errorMessage: string;
  students: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.standardId = params.id;
      if (this.standardId) {
        this.getStandard();
      }
    });

  }

  ngOnInit() {
  }

  getStandard() {
    this.http.get<any>(ApiEndpoint.STANDARD + '/' + this.standardId).subscribe(data => {
      this.standard = data.data;
      this.getStudents();
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
      title: 'Delete Class',
      subtitle: 'Are you really sure to delete?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {

          this.http.delete<any>(ApiEndpoint.STANDARD + '/' + this.standardId).subscribe(data => {

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

            this.router.navigate(['/admin/maintenances/classes']);
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
    this.router.navigate(['admin/maintenances/classes/' + this.standardId + '/edit']);
  }

  private getStudents() {
    this.http.get<any>(ApiEndpoint.STUDENTS, { params: { standard: this.standard.name } }).subscribe(data => {
      this.students = data.data;
    }, err => {
      console.error(err);
    });
  }

}
