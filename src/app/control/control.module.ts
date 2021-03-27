import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGasTransferComponent } from './new-gas-transfer/new-gas-transfer.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../helpers/AuthGuard ';
import { AutomaticFormsModule } from '../forms/forms.module';
import { MaterialModule } from '../material-module';
import { ControlDasboardComponent } from './control-dasboard/control-dasboard.component';

//control/new-transfer
const routes:Routes = [
  {path:'new-transfer', component:NewGasTransferComponent, canActivate: [AuthGuardService], data: { expectedRole: 'transfer_new' }},
  {path:'control-dashboard', component:ControlDasboardComponent, canActivate: [AuthGuardService], data: { expectedRole: 'transfer_new' }}
];


@NgModule({
  declarations: [NewGasTransferComponent, ControlDasboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AutomaticFormsModule,
    MaterialModule,
  ]
})
export class ControlModule { }
