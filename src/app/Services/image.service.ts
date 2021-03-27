import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemImage } from '../models/Image';
import { AppService } from './app-service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends AppService<ItemImage> {

  constructor(client:HttpClient)
  {
    super(client,'images');
   }

   getByItemType(itemId:number, itemType:string):Observable<Array<ItemImage>>{
     return this.client.get<Array<ItemImage>>(`${this.apiUrl}/${itemId}/${itemType}`);
   }

   newMany(images:Array<ItemImage>):Observable<Array<ItemImage>>{
    return this.client.post<Array<ItemImage>>(`${this.apiUrl}/list`,images);
  }

}
