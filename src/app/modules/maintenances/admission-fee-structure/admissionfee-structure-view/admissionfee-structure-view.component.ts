import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { IAdmissionFeeMaintenanceYearly, IAdmissionFeeMaintenance } from 'src/app/modules/students/models/maintenance';
import { ApiEndpoint, IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';

@Component({
  selector: 'app-admissionfee-structure-view',
  templateUrl: './admissionfee-structure-view.component.html',
  styleUrls: ['./admissionfee-structure-view.component.css']
})
export class AdmissionfeeStructureViewComponent implements OnInit {

  errorMessage: string;
  admFeeStructureId: string;
  admFeeStructure: IAdmissionFeeMaintenanceYearly;

  public admFeeStructureColumns: string[] = ['id', 'standard', 'feeAmount', 'admissionAmount'];
  public admFeeStructureDataSource: MatTableDataSource<IAdmissionFeeMaintenance>;
  public admFeeStructures: IAdmissionFeeMaintenance[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.admFeeStructureId = params.id;
    });
  }

  ngOnInit() {
    this.getAdmFeeStructure();
  }

  getAdmFeeStructure() {

    this.http.get<any>(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE + '/' + this.admFeeStructureId).subscribe(data => {

      this.admFeeStructure = data.data;
      this.admFeeStructures = this.admFeeStructure.maintenanceAdmissionFees;
      this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures);
      console.log(this.admFeeStructures);

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
      title: 'Delete Admission Fee Structure',
      subtitle: 'Are you really sure to delete this admission fee structure?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {

          this.http.delete<any>(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE + '/' + this.admFeeStructureId).subscribe(data => {

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

            this.router.navigate(['/admin/maintenances/admission-fees']);
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
    this.router.navigate(['admin/maintenances/admission-fees/' + this.admFeeStructureId + '/edit']);
  }

}
