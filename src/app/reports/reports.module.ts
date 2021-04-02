import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { DailyTransfersComponent } from './daily-transfers/daily-transfers.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../helpers/AuthGuard ';


const routes:Routes = [
  {path:'daily-transfers', component:DailyTransfersComponent, canActivate: [AuthGuardService], data: { expectedRole: 'reports_view' }},
];

@NgModule({
  declarations: [

  DailyTransfersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPrintModule,
    RouterModule.forChild(routes),
  ]
})
export class ReportsModule { }
