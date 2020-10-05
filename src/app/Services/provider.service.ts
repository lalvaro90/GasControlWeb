import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provider } from '../models/Provider';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends AppService<Provider> {

  constructor(client:HttpClient)
  {
    super(client,'Providers');
   }
}
