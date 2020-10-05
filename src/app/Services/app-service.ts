import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

export class AppService<T>{

  apiUrl:string;
  constructor(public client:HttpClient, endpoint:string){
    this.apiUrl = `${environment.api}${endpoint}`;
  }

  get(): Observable<Array<T>>{
    return this.client.get<Array<T>>(this.apiUrl);
  }

  getById(id:number): Observable<T>{
    return this.client.get<T>(`${this.apiUrl}/${id}`);
  }

  new(item:T): Observable<T> {
    return this.client.post<T>(this.apiUrl, item);
  }

  edit(item:T, id: number): Observable<T> {
    return this.client.put<T>(`${this.apiUrl}/${id}`,item);
  }

  delete(id: number): Observable<T>{
    return this.client.delete<T>(`${this.apiUrl}/${id}`)
  }

}
