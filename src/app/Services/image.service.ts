import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
