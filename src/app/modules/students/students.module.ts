import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionFeeCreateEditComponent } from './components/admission-fee/admission-fee-create-edit/admission-fee-create-edit.component';
import { AdmissionFeeListComponent } from './components/admission-fee/admission-fee-list/admission-fee-list.component';
import { AdmissionFeeViewComponent } from './components/admission-fee/admission-fee-view/admission-fee-view.component';
import { SearchStudentDialogComponent } from './components/search-student-dialog/search-student-dialog.component';
import { StudentCreateEditComponent } from './components/student/student-create-edit/student-create-edit.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { StudentViewComponent } from './components/student/student-view/student-view.component';
// tslint:disable-next-line: max-line-length
import { StudentAttendenceCreateEditComponent } from './components/student-attendence/student-attendence-create-edit/student-attendence-create-edit.component';
import { StudentAttendenceListComponent } from './components/student-attendence/student-attendence-list/student-attendence-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDateModule } from '../shared/custom-date.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'add', component: StudentCreateEditComponent },
  { path: ':id/view', component: StudentViewComponent },
  { path: ':id/edit', component: StudentCreateEditComponent },

  { path: 'admissions', component: AdmissionFeeListComponent },
  { path: 'admissions/add', component: AdmissionFeeCreateEditComponent },
  { path: 'admissions/:id/view', component: AdmissionFeeViewComponent },
  { path: 'admissions/:id/edit', component: AdmissionFeeCreateEditComponent },

  { path: 'attendances', component: StudentAttendenceCreateEditComponent },

];

@NgModule({
  declarations: [
    AdmissionFeeCreateEditComponent,
    AdmissionFeeListComponent,
    AdmissionFeeViewComponent,
    SearchStudentDialogComponent,
    StudentCreateEditComponent,
    StudentListComponent,
    StudentViewComponent,
    StudentAttendenceCreateEditComponent,
    StudentAttendenceListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDateModule,
    SharedModule
  ],
  entryComponents: [SearchStudentDialogComponent]
})
export class StudentsModule { }
