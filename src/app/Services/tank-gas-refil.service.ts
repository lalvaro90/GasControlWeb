import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TankGasRefile } from '../models/TankGasRefile';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class TankGasRefilService extends AppService<TankGasRefile> {

  constructor(client:HttpClient)
  {
    super(client,'TankGasRefile');
   }
}
