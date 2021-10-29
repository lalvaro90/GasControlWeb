import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine, MachineConsumptionDto } from '../models/Machine';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class MachineService extends AppService<Machine> {

  constructor(client:HttpClient)
  {
    super(client,'Machine');
   }
   
  getAverageConsumption(): Observable<Array<MachineConsumptionDto>>{
    return this.client.get<Array<MachineConsumptionDto>>(`${this.apiUrl}/average`);
  }
}
