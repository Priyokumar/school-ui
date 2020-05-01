import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { IAdmission, IFee } from '../../../models/admission-fee.model';
import { ApiEndpoint, IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-admission-fee-view',
  templateUrl: './admission-fee-view.component.html',
  styleUrls: ['./admission-fee-view.component.css']
})
export class AdmissionFeeViewComponent implements OnInit {

  errorMessage: string;
  admId: string;
  admission: IAdmission;

  public feeColumns: string[] = [

    'id',
    'feeRef',
    'amount',
    'exptdateOfPayment',
    'actdateOfPayment',
    'monthOf',
    'status',
    'action'
  ];

  public feesDataSource: MatTableDataSource<IFee>;
  public fee: IFee[] = [];
  isSuperAdmin = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.admId = params.id;
    });
  }

  ngOnInit() {
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.getAdmission();
  }

  getAdmission() {

    let resp;
    this.http.get(ApiEndpoint.ADMISSIONS + '/' + this.admId).subscribe(data => {
      resp = data;
      this.admission = resp.data;

      if (this.admission.fees) {
        this.feesDataSource = new MatTableDataSource(this.admission.fees);
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
      title: 'Delete Admission',
      subtitle: 'Are you really sure to delete this admission?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {

          this.http.delete<any>(ApiEndpoint.ADMISSIONS + '/' + this.admId).subscribe(data => {

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

            this.router.navigate(['/admin/students/admissions']);
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
    this.router.navigate(['admin/students/admissions/' + this.admId + '/edit']);
  }

  onDeleteFeeRow(feeId: number) {

  }

  onClickRow(fee: IFee) {

  }

  payFee(fee: IFee) {
    this.dialog.open(ConfirmationDialogComponent,
      {
        width: '26%',
        data: {
          title: 'Pay fee',
          subtitle: 'Click Ok to pay the fee.'
        }
        , disableClose: true
      })
      .afterClosed().subscribe(okData => {
        if (okData) {
          this.http.put(ApiEndpoint.ADMISSIONS + '/' + this.admId + '/fee/' + fee.id, {}).subscribe(data => {

            this.getAdmission();
            const configSuccess: MatSnackBarConfig = {
              panelClass: 'success-snackbar',
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            };
            this.snackBar.openFromComponent(SnackbarInfoComponent, { data: 'Successfully paid the fee.', ...configSuccess });

          }, err => {
            console.error(err);
            if (err.error && err.error.apiMessage) {
              this.errorMessage = err.error.apiMessage.detail;
            } else {
              this.errorMessage = err.message;
            }
          });

        }
      });
  }

}
