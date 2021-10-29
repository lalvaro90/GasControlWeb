import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGasTransferComponent } from './new-gas-transfer/new-gas-transfer.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../helpers/AuthGuard ';
import { AutomaticFormsModule } from '../forms/forms.module';
import { MaterialModule } from '../material-module';
import { ControlDasboardComponent } from './control-dasboard/control-dasboard.component';
import { NewGasTransferTankComponent } from './new-gas-transfer-tank/new-gas-transfer-tank.component';
import { NewTankGasRefileComponent } from './new-tank-gas-refile/new-tank-gas-refile.component';

//control/new-transfer
const routes:Routes = [
  {path:'new-transfer', component:NewGasTransferComponent, canActivate: [AuthGuardService], data: { expectedRole: 'transfer_new' }},
  {path:'new-transfer-tank', component:NewGasTransferTankComponent, canActivate: [AuthGuardService], data: { expectedRole: 'transferTank_new' }},
  {path:'new-refill-tank', component:NewTankGasRefileComponent, canActivate: [AuthGuardService], data: { expectedRole: 'purchaseTank_new' }},
  {path:'control-dashboard', component:ControlDasboardComponent, canActivate: [AuthGuardService], data: { expectedRole: 'transfer_dashboard' }}
];


@NgModule({
  declarations: [NewGasTransferComponent, ControlDasboardComponent, NewGasTransferTankComponent, NewTankGasRefileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AutomaticFormsModule,
    MaterialModule,
  ]
})
export class ControlModule { }
