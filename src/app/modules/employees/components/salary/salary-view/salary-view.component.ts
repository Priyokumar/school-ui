import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IEmployeeSalary } from '../../../model/employeeModels';
import { ApiEndpoint } from 'src/app/modules/shared/model/shared.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-salary-view',
  templateUrl: './salary-view.component.html',
  styleUrls: ['./salary-view.component.css']
})
export class SalaryViewComponent implements OnInit {

  errorMessage: string;
  empSalaryId: number;
  empSalary: IEmployeeSalary;

  updateMode = false;
  imageUrl: string;

  salaryAmountFormCtrl = new FormControl('', null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.empSalaryId = params.salId;
    });
  }

  ngOnInit() {
    this.getEmployeeSalary();
  }

  getEmployeeSalary() {

    let resp;
    this.http.get(ApiEndpoint.EMPLOYEE_SALARY + '/' + this.empSalaryId).subscribe(data => {
      resp = data;
      this.empSalary = resp.data;
      this.imageUrl = ApiEndpoint.DOCUMENT + '/' + this.empSalary.employee.profilePic.id + '/view';

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

  update() {
    this.updateMode = true;
    this.salaryAmountFormCtrl.setValue(this.empSalary.salaryAmount);
  }

  cancel() {
    this.updateMode = false;
    this.salaryAmountFormCtrl.setValue(null);
    this.errorMessage = null;
  }

  updateSalaryAmount() {

    const employeeSalary: IEmployeeSalary = {
      employee: null,
      id: null,
      salaryAmount: this.salaryAmountFormCtrl.value
    };

    this.http.put(ApiEndpoint.EMPLOYEE_SALARY + '/' + this.empSalaryId + '/update-salary', employeeSalary).subscribe(data => {

      this.updateMode = false;
      this.getEmployeeSalary();

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

}
