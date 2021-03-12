import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddImageComponent } from './general/add-image/add-image.component';
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
  {path:'images/:service/:property/:id', component: AddImageComponent},
  {path: 'config', loadChildren: './app-configuration/app-configuration.module#AppConfigurationModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
