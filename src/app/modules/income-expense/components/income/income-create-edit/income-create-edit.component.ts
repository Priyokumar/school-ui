import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IIncome, IncomeTypes } from '../../../models/income-expense.model';
import { IKeyValue } from 'src/app/modules/shared/model/IKeyVal';
import { ApiEndpoint } from 'src/app/modules/shared/model/shared.model';

@Component({
  selector: 'app-income-create-edit',
  templateUrl: './income-create-edit.component.html',
  styleUrls: ['./income-create-edit.component.css']
})
export class IncomeCreateEditComponent implements OnInit {

  incomeId: number;
  errorMessage: string;

  incomeForm: FormGroup;
  income: IIncome;
  incomeTypes: IKeyValue[] = IncomeTypes;

  idFormCtl = new FormControl('', null);
  refNoFormCtl = new FormControl('', null);
  amountFormCtl = new FormControl('', Validators.required);
  incomeTypeFormCtl = new FormControl('', Validators.required);
  incomeDetailsFormCtl = new FormControl('', Validators.required);
  commentsFormCtl = new FormControl('', null);
  incomeDateFormCtl = new FormControl('', Validators.required);

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {

    this.incomeForm = new FormGroup({
      refNoFormCtl: this.refNoFormCtl,
      amountFormCtl: this.amountFormCtl,
      incomeTypeFormCtl: this.incomeTypeFormCtl,
      incomeDetailsFormCtl: this.incomeDetailsFormCtl,
      commentsFormCtl: this.commentsFormCtl,
      incomeDateFormCtl: this.incomeDateFormCtl
    });

    this.activatedRoute.params.subscribe(params => {
      this.incomeId = params.id;
      if (this.incomeId) {
        this.getIncome();
      }
    });

    this.refNoFormCtl.disable();
    this.incomeDateFormCtl.disable();
  }

  ngOnInit() {
  }

  public getIncome(): any {
    this.http.get<any>(ApiEndpoint.INCOMES + '/' + this.incomeId).subscribe(data => {

      this.income = data.data;
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

    const incomePayload: IIncome = {

      amount: this.amountFormCtl.value,
      comments: this.commentsFormCtl.value,
      incomeDate: this.incomeDateFormCtl.value,
      incomeDetails: this.incomeDetailsFormCtl.value,
      incomeType: this.incomeTypeFormCtl.value,
      id: this.idFormCtl.value,
      refNo: this.refNoFormCtl.value

    };

    this.saveOrUpdateHttpObservable(incomePayload).subscribe(data => {

      this.router.navigate(['/admin/incomes-expenses/incomes']);

    }, err => {
      console.error(err);
      if (err.error && err.error.apiMessage) {
        this.errorMessage = err.error.apiMessage.detail;
      } else {
        this.errorMessage = err.message;
      }
    });
  }

  private saveOrUpdateHttpObservable(incomePayload: IIncome) {

    if (this.incomeId) {
      return this.http.put(ApiEndpoint.INCOMES + '/' + this.incomeId, incomePayload);
    } else {
      return this.http.post(ApiEndpoint.INCOMES, incomePayload);
    }
  }

  public setForm() {

    this.idFormCtl.setValue(this.income.id);
    this.refNoFormCtl.setValue(this.income.refNo);
    this.amountFormCtl.setValue(this.income.amount);
    this.incomeTypeFormCtl.setValue(this.income.incomeType);
    this.incomeDetailsFormCtl.setValue(this.income.incomeDetails);
    this.commentsFormCtl.setValue(this.income.comments);
    this.incomeDateFormCtl.setValue(this.income.incomeDate);
  }

}
