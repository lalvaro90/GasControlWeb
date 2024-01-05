import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomaticBuildFormsComponent } from './build-forms/build-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { NgxPrintModule } from 'ngx-print';
import { BuildListsComponent } from './build-lists/build-lists.component';
import { IConfig, NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { GoogleMapsModule } from '@angular/google-maps';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { ReportBuilderComponent } from './report-builder/report-builder.component';


const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

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
    NgxMaskDirective,
    GoogleMapsModule,
    AngularSignaturePadModule,
  ],
  providers:[
    provideEnvironmentNgxMask(maskConfigFunction)
  ],
  exports:[
    AutomaticBuildFormsComponent,
    BuildListsComponent,
    ReportBuilderComponent
  ]
})
export class AutomaticFormsModule { }
