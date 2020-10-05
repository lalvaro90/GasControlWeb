import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MachineGasRefile } from '../models/MachineGasRefile';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class MachineGasRefileService extends AppService<MachineGasRefile> {

  constructor(client:HttpClient)
  {
    super(client,'configurations');
   }
}
