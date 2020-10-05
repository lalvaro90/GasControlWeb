import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '../models/FormItem';
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



@NgModule({
  declarations: [
    ProviderNewComponent,
    ProviderListComponent,
    UserListComponent,
    UserNewComponent,
    SecurityComponent,
    MachineNewComponent,
    MachineListComponent,
  ],
  imports: [
    CommonModule,
    AutomaticFormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ConfigurationModule { }
