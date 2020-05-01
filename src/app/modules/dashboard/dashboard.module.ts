import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent }
];

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class DashboardModule { }
