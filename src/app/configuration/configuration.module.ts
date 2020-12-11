import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomaticFormsModule } from '../forms/forms.module';
import { MaterialModule } from '../material-module';
import { ProviderNewComponent } from './provider-new/provider-new.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { SecurityComponent } from './security/security.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MachineNewComponent } from './machine-new/machine-new.component';
import { MachineListComponent } from './machine-list/machine-list.component';
import { MainConfigurationComponent } from './main-configuration/main-configuration.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../helpers/AuthGuard ';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path: 'provider-new', component: ProviderNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'providers_new' }},
  {path: 'provider-edit', component: ProviderNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'providers_edit' }},
  {path: 'provider-list', component: ProviderListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'providers_view' }},
  {path: 'user-new', component: UserNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_new' }},
  {path: 'user-edit', component: UserNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_edit' }},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_view' }},
  {path: 'user-security', component: SecurityComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_new' }},
  {path: 'main-config', component: MainConfigurationComponent, canActivate: [AuthGuardService], data: { expectedRole: 'config_edit' }},
];

@NgModule({
  declarations: [
    ProviderNewComponent,
    ProviderListComponent,
    UserListComponent,
    UserNewComponent,
    SecurityComponent,
    MachineNewComponent,
    MachineListComponent,
    MainConfigurationComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AutomaticFormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ConfigurationModule { }
