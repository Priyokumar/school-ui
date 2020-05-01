import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IIncome } from '../../../models/income-expense.model';
import { ApiEndpoint, IConfirmation } from 'src/app/modules/shared/model/shared.model';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-income-view',
  templateUrl: './income-view.component.html',
  styleUrls: ['./income-view.component.css']
})
export class IncomeViewComponent implements OnInit {

  errorMessage: string;
  incomeId: string;
  income: IIncome;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.incomeId = params.id;
    });
  }

  ngOnInit() {
    this.getIncome();
  }

  getIncome() {

    this.http.get<any>(ApiEndpoint.INCOMES + '/' + this.incomeId).subscribe(data => {

      this.income = data.data;

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
      title: 'Delete Income',
      subtitle: 'Are you really sure to delete this income?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {

          this.http.delete(ApiEndpoint.INCOMES + '/' + this.incomeId).subscribe(data => {
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
      });
  }

  edit() {
    this.router.navigate(['/admin/incomes-expenses/incomes/' + this.incomeId + '/edit']);
  }

}
