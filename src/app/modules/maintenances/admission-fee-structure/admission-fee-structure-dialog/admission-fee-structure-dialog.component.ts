import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IAdmissionFeeMaintenance } from 'src/app/modules/students/models/maintenance';
import { ApiEndpoint } from 'src/app/modules/shared/model/shared.model';
import { HttpClient } from '@angular/common/http';
import { IStandard } from '../../model/standard';

@Component({
  selector: 'app-admission-fee-structure-dialog',
  templateUrl: './admission-fee-structure-dialog.component.html',
  styleUrls: ['./admission-fee-structure-dialog.component.css']
})
export class AdmissionFeeStructureDialogComponent implements OnInit {

  idFctrl = new FormControl(null, Validators.required);
  standardFctrl = new FormControl(null, Validators.required);
  feeAmountFctrl = new FormControl(null, Validators.required);
  admissionAmountFctrl = new FormControl(null, Validators.required);

  actionMode = 'CREATE';
  admFeeMaintForm: FormGroup;
  standards: IStandard[] = [];

  constructor(
    public dialogRef: MatDialogRef<AdmissionFeeStructureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAdmissionFeeMaintenance,
    private http: HttpClient
    ) {

    dialogRef.disableClose = true;
    this.admFeeMaintForm = new FormGroup({
      standardFctrl: this.standardFctrl,
      feeAmountFctrl: this.feeAmountFctrl,
      admissionAmountFctrl: this.admissionAmountFctrl,
    });

    if (data) {
      this.actionMode = 'EDIT';
      this.standardFctrl.setValue(data.standard);
      this.feeAmountFctrl.setValue(data.feeAmount);
      this.admissionAmountFctrl.setValue(data.admissionAmount);
    }

  }

  ngOnInit() {
    this.getStandard();
  }

  public add() {

    const admFeeMaint: IAdmissionFeeMaintenance = {
      id: this.idFctrl.value,
      admissionAmount: this.admissionAmountFctrl.value,
      feeAmount: this.feeAmountFctrl.value,
      standard: this.standardFctrl.value,
    };
    this.dialogRef.close(admFeeMaint);
  }

  public cancel() {
    this.dialogRef.close();
  }

  getStandard() {

    this.http.get<any>(ApiEndpoint.STANDARD).subscribe(data => {
      this.standards = data.data;
    }, err => {
      console.error(err);
    });
  }

}
