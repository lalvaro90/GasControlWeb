import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Machine } from '../models/Machine';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class MachineService extends AppService<Machine> {

  constructor(client:HttpClient)
  {
    super(client,'configurations');
   }
}
