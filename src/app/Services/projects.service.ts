import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/Project';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends AppService<Project> {

  constructor(client:HttpClient)
  {
    super(client,'projects');
   }
}
