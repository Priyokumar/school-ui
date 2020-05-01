import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { IAdmissionFeeMaintenanceYearly } from 'src/app/modules/students/models/maintenance';
import { ApiEndpoint, IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';

@Component({
  selector: 'app-admissionfee-structure-list',
  templateUrl: './admissionfee-structure-list.component.html',
  styleUrls: ['./admissionfee-structure-list.component.scss']
})
export class AdmissionfeeStructureListComponent implements OnInit {

  public errorMessage: string;
  public admFeeStructureColumns: string[] = ['id', 'year', 'action'];
  public admFeeStructureDataSource: MatTableDataSource<IAdmissionFeeMaintenanceYearly>;
  public admFeeStructures: IAdmissionFeeMaintenanceYearly[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAdmFeeStructures();
  }

  private getAdmFeeStructures() {

    let resp;
    this.http.get(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.admFeeStructures = resp.data;
        this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures);

        if (!this.admFeeStructures) {
          this.errorMessage = 'No user found';
        }

      } else {
        this.errorMessage = resp.apiMessage.detail;
      }

    }, err => {
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }

      console.error(err);
    });

  }

  public onClickRow(admFeeStructureId: number) {
    this.router.navigate(['/admin/maintenances/admission-fees/' + admFeeStructureId + '/view']);
  }

  public onDeleteRow(admFeeStructureId: number) {

    const confirmationData: IConfirmation = {
      title: 'Delete Admission Fee Structure',
      subtitle: 'Are you really sure to delete this admission fee structure?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {

          this.http.delete<any>(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE + '/' + admFeeStructureId).subscribe(data => {

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

            this.admFeeStructureDataSource = new MatTableDataSource([]);
            this.getAdmFeeStructures();
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
