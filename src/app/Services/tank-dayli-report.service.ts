import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TankDayliReport } from '../models/Person';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class TankDayliReportService extends AppService<TankDayliReport> {

  constructor(client:HttpClient)
  {
    super(client,'TankDayliReport');
   }
}
