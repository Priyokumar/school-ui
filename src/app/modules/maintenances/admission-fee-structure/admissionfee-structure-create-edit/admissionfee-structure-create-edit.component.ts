import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { AdmissionFeeStructureDialogComponent } from '../admission-fee-structure-dialog/admission-fee-structure-dialog.component';
import { IAdmissionFeeMaintenance, IAdmissionFeeMaintenanceYearly } from 'src/app/modules/students/models/maintenance';
import { CommonService } from 'src/app/modules/shared/services/common.service';
import { ApiEndpoint, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';

@Component({
  selector: 'app-admissionfee-structure-create-edit',
  templateUrl: './admissionfee-structure-create-edit.component.html',
  styleUrls: ['./admissionfee-structure-create-edit.component.css']
})
export class AdmissionfeeStructureCreateEditComponent implements OnInit {

  admFeeStructureYearlId: number;
  errorMessage: string;

  public admFeeStructureColumns: string[] = ['id', 'standard', 'feeAmount', 'admissionAmount', 'action'];
  public admFeeStructureDataSource: MatTableDataSource<IAdmissionFeeMaintenance>;
  public admFeeStructures: IAdmissionFeeMaintenance[] = [];

  admFeeStructureYearlyForm: FormGroup;
  admFeeStructureYearly: IAdmissionFeeMaintenanceYearly;
  years: string[] = [];

  idFormCtl = new FormControl('', null);
  yearFormCtl = new FormControl('', Validators.required);

  constructor(private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {

    this.admFeeStructureYearlyForm = new FormGroup({

      yearFormCtl: this.yearFormCtl,

    });

    this.activatedRoute.params.subscribe(params => {
      this.admFeeStructureYearlId = params.id;
      if (this.admFeeStructureYearlId) {
        this.getAdmFeeStructureYearly();
      }
    });
  }

  ngOnInit() {
    this.years = this.commonService.yearsLtCurrentYear(10);
  }

  public getAdmFeeStructureYearly(): any {
    this.http.get<any>(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE + '/' + this.admFeeStructureYearlId).subscribe(data => {
      this.admFeeStructureYearly = data.data;
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

  public save() {

    const admFeeStructureYearlyPayload: IAdmissionFeeMaintenanceYearly = {

      id: this.idFormCtl.value,
      year: this.yearFormCtl.value,
      maintenanceAdmissionFees: this.admFeeStructures

    };

    this.saveOrUpdateHttpObservable(admFeeStructureYearlyPayload).subscribe(data => {

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

      this.router.navigate(['admin/maintenances/admission-fees']);
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
          data: SnackBarConfig.dangerData(this.errorMessage ),
          ...SnackBarConfig.flashTopDangerSnackBar()
        });
    });
  }

  private saveOrUpdateHttpObservable(admFeeStructureYearlyPayload: IAdmissionFeeMaintenanceYearly) {

    if (this.admFeeStructureYearlId) {
      return this.http.put<any>(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE + '/' + this.admFeeStructureYearlId, admFeeStructureYearlyPayload);
    } else {
      return this.http.post<any>(ApiEndpoint.ADDMISSION_FEE_MAINTENANCE, admFeeStructureYearlyPayload);
    }
  }

  public setForm() {

    this.idFormCtl.setValue(this.admFeeStructureYearly.id);
    this.yearFormCtl.setValue(this.admFeeStructureYearly.year);
    this.admFeeStructures = this.admFeeStructureYearly.maintenanceAdmissionFees;
    this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures);
  }

  public addAdmFeeStructure() {
    const dialogRef = this.dialog.open(AdmissionFeeStructureDialogComponent, { width: '60%' })
      .afterClosed().subscribe(data => {
        if (data) {
          if (!this.admFeeStructures) {
            this.admFeeStructures = [];
          }
          this.admFeeStructures.push(data);
          this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures);
        }
      });
  }

  public onDelete(index: number) {
    this.admFeeStructures.splice(index, 1);
    this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures);
  }

  public edit(index: number, admFeeMaint: IAdmissionFeeMaintenance) {
    const dialogRef = this.dialog.open(AdmissionFeeStructureDialogComponent, { width: '60%', data: admFeeMaint })
      .afterClosed().subscribe(data => {
        if (data) {
          this.admFeeStructures[index] = data;
          this.admFeeStructureDataSource = new MatTableDataSource(this.admFeeStructures);
        }
      });
  }

}
