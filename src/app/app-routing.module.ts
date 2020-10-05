import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './helpers/AuthGuard ';
import { ProviderNewComponent } from './configuration/provider-new/provider-new.component';
import { ProviderListComponent } from './configuration/provider-list/provider-list.component';
import { UserListComponent } from './configuration/user-list/user-list.component';
import { UserNewComponent } from './configuration/user-new/user-new.component';
import { SecurityComponent } from './configuration/security/security.component';
import { LoginComponent } from './general/login/login.component';

/*
user_new;user_view;user_edit;user_delete;
asset_new;asset_view;asset_edit;
depreciation_new;depreciation_view;depreciation_edit;depreciation_delete;
location_new;location_view;location_edit;location_delete;
responsible_new;responsible_view;responsible_edit;responsible_delete;
acquisition_new;acquisition_view;acquisition_edit;acquisition_delete;
states_new;states_view;states_edit;states_delete;
config_view;config_edit;reports_view
asset_delete;asset_transfer;
user_new;user_view;user_edit;user_delete;asset_new;asset_view;asset_edit;asset_delete;asset_transfer;
depreciation_new;depreciation_view;
depreciation_edit;depreciation_delete;location_new;location_view;location_edit;location_delete;
responsible_new;responsible_view;responsible_edit;responsible_delete;acquisition_new;acquisition_view;
acquisition_edit;acquisition_delete;states_new;states_view;states_edit;states_delete;providers_new;
providers_view;providers_edit;providers_delete;config_view;config_edit;reports_view;"
*/

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path:'login', component: LoginComponent},
  {path: 'provider-new', component: ProviderNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'providers_new' }},
  {path: 'provider-edit', component: ProviderNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'providers_edit' }},
  {path: 'provider-list', component: ProviderListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'providers_view' }},
  {path: 'user-new', component: UserNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_new' }},
  {path: 'user-edit', component: UserNewComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_edit' }},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_view' }},
  {path: 'user-security', component: SecurityComponent, canActivate: [AuthGuardService], data: { expectedRole: 'user_new' }},
  {path: 'main-config', component: Main, canActivate: [AuthGuardService], data: { expectedRole: 'config_edit' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
