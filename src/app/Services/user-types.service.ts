import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from '../models/User';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class UserTypesService extends AppService<UserType> {

  constructor(client:HttpClient) {
    super(client,`UserTypes`);
   }
}
