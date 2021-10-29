import { Injectable } from '@angular/core';
import { AppService } from './app-service';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../models/Configuration';
import { config, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends AppService<Configuration> {

  static configuration:Configuration;

  constructor(client:HttpClient)
  {
    super(client,'configurations');
   }

   getConfiguration():Observable<Configuration>{
    if(ConfigService.configuration)
      return of(ConfigService.configuration)
      else{
        this.getById(1).subscribe( res => ConfigService.configuration = res);
        return this.getById(1);
      }
   }
}
