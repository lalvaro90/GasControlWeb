import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '../models/FormItem';
import { AutomaticFormsModule } from '../forms/forms.module';
import { NgxPrintModule } from 'ngx-print';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AutomaticFormsModule,
    NgxPrintModule,
  ],
  providers:[

  ]
})
export class GeneralModule { }
