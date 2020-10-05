import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ]
})
export class ReportsModule { }
