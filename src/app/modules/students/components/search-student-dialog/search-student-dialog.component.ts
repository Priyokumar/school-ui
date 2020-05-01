import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { IStudent } from '../../models/student.model';
import { ApiEndpoint } from 'src/app/modules/shared/model/shared.model';

@Component({
  selector: 'app-search-student-dialog',
  templateUrl: './search-student-dialog.component.html',
  styleUrls: ['./search-student-dialog.component.css']
})
export class SearchStudentDialogComponent implements OnInit {

  public errorMessage: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // tslint:disable-next-line: max-line-length
  public studentsColumns: string[] = ['firstName', 'middleName', 'lastName', 'registrationNo', 'registrationDate', 'registrationStatus'];
  public studentsDataSource: MatTableDataSource<IStudent>;
  public students: IStudent[] = [];
  fetchingStudents = false;

  constructor(
    public dialogRef: MatDialogRef<SearchStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient
  ) { }

  ngOnInit() {
    this.getStudents();
  }

  private getStudents() {

    this.fetchingStudents = true;
    this.http.get<any>(ApiEndpoint.STUDENTS).subscribe(data => {

      this.students = data.data;
      this.studentsDataSource = new MatTableDataSource(this.students);
      this.studentsDataSource.paginator = this.paginator;
      this.studentsDataSource.sort = this.sort;
      this.fetchingStudents = false;

    }, err => {
      this.fetchingStudents = false;
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

  public select(student: IStudent) {
    this.dialogRef.close(student);
  }

  public close() {
    this.dialogRef.close();
  }

}
