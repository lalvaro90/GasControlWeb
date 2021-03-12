import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomaticBuildFormsComponent } from './build-forms/build-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { NgxPrintModule } from 'ngx-print';
import { BuildListsComponent } from './build-lists/build-lists.component';
import { TextMaskModule } from 'angular2-text-mask';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    AutomaticBuildFormsComponent,
    BuildListsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    NgxPrintModule,
    TextMaskModule,
    GoogleMapsModule,
  ],
  exports:[
    AutomaticBuildFormsComponent,
    BuildListsComponent
  ]
})
export class AutomaticFormsModule { }
