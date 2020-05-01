import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IIncome } from '../../../models/income-expense.model';
import { ApiEndpoint, IConfirmation } from 'src/app/modules/shared/model/shared.model';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  public errorMessage: string;
  public incomeColumns: string[] = ['id', 'refNo', 'amount', 'incomeType', 'incomeDetails', 'comments', 'incomeDate', 'action'];
  public incomeDataSource: MatTableDataSource<IIncome>;
  public incomes: IIncome[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getIncomes();
  }

  private getIncomes() {

    let resp;
    this.http.get(ApiEndpoint.INCOMES).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.incomes = resp.data;
        this.incomeDataSource = new MatTableDataSource(this.incomes);

        if (!this.incomes) {
          this.errorMessage = 'No income found';
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

  public onClickRow(incomeId: number) {

    this.router.navigate(['/admin/incomes-expenses/incomes/' + incomeId + '/view']);

  }

  public onDeleteRow(incomeId: number) {

    const confirmationData: IConfirmation = {
      title: 'Delete Income',
      subtitle: 'Are you really sure to delete this income?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {

          this.http.delete(ApiEndpoint.INCOMES + '/' + incomeId).subscribe(data => {
            this.incomeDataSource = new MatTableDataSource([]);
            this.getIncomes();
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
