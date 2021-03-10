import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { TokenInterceptor } from './models/Interceptor';
import { UserService } from './Services/user.service';
import { AuthGuardService } from './helpers/AuthGuard ';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GeneralModule } from './general/general.module';
import { AutomaticFormsModule } from './forms/forms.module';
import {NgxPrintModule} from 'ngx-print';
import { ReportsModule } from './reports/reports.module';
import { AppConfigurationModule } from './app-configuration/app-configuration.module';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    GeneralModule,
    ReportsModule,
    AutomaticFormsModule,
    NgxPrintModule,
    AppConfigurationModule,
    GoogleMapsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    UserService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
