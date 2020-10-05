import { Injectable } from '@angular/core';
import { AppService } from './app-service';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../models/Configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends AppService<Configuration> {

  constructor(client:HttpClient)
  {
    super(client,'configurations');
   }
}
