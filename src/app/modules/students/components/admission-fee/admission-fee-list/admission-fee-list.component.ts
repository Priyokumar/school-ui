import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IAdmission } from '../../../models/admission-fee.model';
import { ApiEndpoint, IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-admission-fee-list',
  templateUrl: './admission-fee-list.component.html',
  styleUrls: ['./admission-fee-list.component.scss']
})
export class AdmissionFeeListComponent implements OnInit {

  public errorMessage: string;
  public admissionColumns: string[] = [
    'name',
    'registrationNo',
    'studentStatus',
    'admissionStatus',
    'Class',
    'Admission Number',
    'action'
  ];
  public admissionsDataSource: MatTableDataSource<IAdmission>;
  public admissions: IAdmission[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isSuperAdmin = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.getAdmissions();
  }

  private getAdmissions() {

    this.http.get<any>(ApiEndpoint.ADMISSIONS).subscribe(data => {
      this.admissions = data.data;
      this.admissionsDataSource = new MatTableDataSource(this.admissions);
      this.admissionsDataSource.paginator = this.paginator;
      this.admissionsDataSource.sort = this.sort;
    }, err => {
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }

      console.error(err);
    });

  }

  applyFilter(filterValue: string) {
    this.admissionsDataSource.filter = filterValue.trim().toLowerCase();
  }

  public onClickRow(admId: number) {

    this.router.navigate(['/admin/students/admissions/' + admId + '/view']);

  }

  public onDeleteRow(admId: number) {

    const confirmationData: IConfirmation = {
      title: 'Delete Admission',
      subtitle: 'Are you really sure to delete this admission?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {

          this.http.delete<any>(ApiEndpoint.ADMISSIONS + '/' + admId).subscribe(data => {
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
            this.admissionsDataSource = new MatTableDataSource([]);
            this.ngOnInit();
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


}
