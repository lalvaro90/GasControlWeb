import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectConsumtionDto } from '../models/Project';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends AppService<Project> {

  constructor(client:HttpClient)
  {
    super(client,'projects');
   }

   getConsumption(): Observable<Array<ProjectConsumtionDto>>{
    return this.client.get<Array<ProjectConsumtionDto>>(`${this.apiUrl}/cunsumption`);
  }
}
