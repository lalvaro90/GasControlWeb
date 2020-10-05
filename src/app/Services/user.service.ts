import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AppService<User> {

  apiUrl:string;
  loggedUser = new BehaviorSubject<User>(undefined);

  constructor(client:HttpClient) {
    super(client,`users`);
   }

   login(user:User):Observable<User> {
     return this.client.post<User>(`${this.apiUrl}/0`,user);
   }

}
