import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint, IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IStudent } from '../../../models/student.model';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  public errorMessage: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // tslint:disable-next-line: max-line-length
  public studentsColumns: string[] = ['firstName', 'middleName', 'lastName', 'gender', 'rollNo', 'standard', 'registrationNo', 'status', 'action'];
  public studentsDataSource: MatTableDataSource<IStudent>;
  public students: IStudent[] = [];
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
    this.getStudents();
  }

  private getStudents() {

    let resp;
    this.http.get(ApiEndpoint.STUDENTS).subscribe(data => {

      resp = data;
      if (resp && !resp.apiMessage.error) {

        this.students = resp.data;
        this.studentsDataSource = new MatTableDataSource(this.students);
        this.studentsDataSource.paginator = this.paginator;
        this.studentsDataSource.sort = this.sort;

        if (!this.students) {
          this.errorMessage = 'No Student found';
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

  applyFilter(filterValue: string) {
    this.studentsDataSource.filter = filterValue.trim().toLowerCase();
  }

  public onClickRow(studId: number) {

    this.router.navigate(['/admin/students/' + studId + '/view']);

  }

  public onDeleteRow(studId: number) {
    const confirmationData: IConfirmation = {
      title: 'Delete Student',
      subtitle: 'Are you really sure to delete this student?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {

          this.http.delete<any>(ApiEndpoint.STUDENTS + '/' + studId).subscribe(data => {
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
            this.getStudents();
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
