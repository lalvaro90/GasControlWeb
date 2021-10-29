import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { DailyTransfersComponent } from './daily-transfers/daily-transfers.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../helpers/AuthGuard ';
import { AutomaticFormsModule } from '../forms/forms.module';
import { ProjectTransfersComponent } from './project-transfers/project-transfers.component';
import { UserTransfersComponent } from './user-transfers/user-transfers.component';


const routes:Routes = [
  {path:'daily-transfers', component:DailyTransfersComponent, canActivate: [AuthGuardService], data: { expectedRole: 'reports_view' }},
  {path:'project-transfers', component:ProjectTransfersComponent, canActivate: [AuthGuardService], data: { expectedRole: 'reports_view' }},
  {path:'report-by-person', component:UserTransfersComponent, canActivate: [AuthGuardService], data: { expectedRole: 'reports_view' }},
];

@NgModule({
  declarations: [

  DailyTransfersComponent,

  ProjectTransfersComponent,

  UserTransfersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPrintModule,
    AutomaticFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ReportsModule { }
