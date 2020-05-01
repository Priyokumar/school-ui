import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line: max-line-length
import { AdmissionFeeStructureDialogComponent } from './admission-fee-structure/admission-fee-structure-dialog/admission-fee-structure-dialog.component';
// tslint:disable-next-line: max-line-length
import { AdmissionfeeStructureCreateEditComponent } from './admission-fee-structure/admissionfee-structure-create-edit/admissionfee-structure-create-edit.component';
import { Routes, RouterModule } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { AdmissionfeeStructureListComponent } from './admission-fee-structure/admissionfee-structure-list/admissionfee-structure-list.component';
// tslint:disable-next-line: max-line-length
import { AdmissionfeeStructureViewComponent } from './admission-fee-structure/admissionfee-structure-view/admissionfee-structure-view.component';
import { ClassListComponent } from './class/class-list/class-list.component';
import { ClassCreateEditComponent } from './class/class-create-edit/class-create-edit.component';
import { ClassViewComponent } from './class/class-view/class-view.component';
import { MaterialModule } from '../shared/material/material.module';
import { CustomDateModule } from '../shared/custom-date.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'admission-fees', component: AdmissionfeeStructureListComponent },
  { path: 'admission-fees/add', component: AdmissionfeeStructureCreateEditComponent },
  { path: 'admission-fees/:id/view', component: AdmissionfeeStructureViewComponent },
  { path: 'admission-fees/:id/edit', component: AdmissionfeeStructureCreateEditComponent },

  { path: 'classes', component: ClassListComponent },
  { path: 'classes/add', component: ClassCreateEditComponent },
  { path: 'classes/:id/view', component: ClassViewComponent },
  { path: 'classes/:id/edit', component: ClassCreateEditComponent },
];

@NgModule({
  declarations: [
    AdmissionfeeStructureListComponent,
    AdmissionFeeStructureDialogComponent,
    AdmissionfeeStructureCreateEditComponent,
    AdmissionfeeStructureViewComponent,
    ClassListComponent,
    ClassCreateEditComponent,
    ClassViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    CustomDateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [AdmissionFeeStructureDialogComponent]
})
export class MaintenancesModule { }
