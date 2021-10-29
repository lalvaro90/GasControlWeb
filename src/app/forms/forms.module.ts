import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomaticBuildFormsComponent } from './build-forms/build-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { NgxPrintModule } from 'ngx-print';
import { BuildListsComponent } from './build-lists/build-lists.component';
import { TextMaskModule } from 'angular2-text-mask';
import { GoogleMapsModule } from '@angular/google-maps';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ReportBuilderComponent } from './report-builder/report-builder.component';



@NgModule({
  declarations: [
    AutomaticBuildFormsComponent,
    BuildListsComponent,
    ReportBuilderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    NgxPrintModule,
    TextMaskModule,
    GoogleMapsModule,
    SignaturePadModule,
  ],
  exports:[
    AutomaticBuildFormsComponent,
    BuildListsComponent,
    ReportBuilderComponent
  ]
})
export class AutomaticFormsModule { }
