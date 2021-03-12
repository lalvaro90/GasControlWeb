import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineListComponent } from './machine-list/machine-list.component';
import { MachineNewComponent } from './machine-new/machine-new.component';
import { MainConfigurationComponent } from './main-configuration/main-configuration.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderNewComponent } from './provider-new/provider-new.component';
import { SecurityComponent } from './security/security.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { AuthGuardService } from '../helpers/AuthGuard ';
import { RouterModule, Routes } from '@angular/router';
import { AutomaticFormsModule } from '../forms/forms.module';
import { MaterialModule } from '../material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path: 'provider-new', component: ProviderNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'providers_new' }},
  {path: 'provider-edit', component: ProviderNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'providers_edit' }},
  {path: 'provider-list', component: ProviderListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'providers_view' }},
  {path: 'project-new', component: ProjectNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'project_new' }},
  {path: 'project-edit', component: ProjectNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'project_edit' }},
  {path: 'project-list', component: ProjectListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'project_view' }},
  {path: 'machine-new', component: MachineNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'machine_new' }},
  {path: 'machine-edit', component: MachineNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'machine_edit' }},
  {path: 'machine-list', component: MachineListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'machine_view' }},
  {path: 'user-new', component: UserNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_new' }},
  {path: 'user-edit', component: UserNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_edit' }},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_view' }},
  {path: 'user-security', component: SecurityComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_new' }},
  {path: 'main-config', component: MainConfigurationComponent, canActivate: [AuthGuardService], data: { expectedRole: 'config_edit' }},
];

@NgModule({
  declarations: [
    MachineListComponent,
    MachineNewComponent,
    MainConfigurationComponent,
    ProviderListComponent,
    ProviderNewComponent,
    SecurityComponent,
    UserListComponent,
    UserNewComponent,
    ProjectNewComponent,
    ProjectListComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AutomaticFormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class AppConfigurationModule { }
