import { Router } from '@angular/router';

export class ListModel{

  listItems:Array<ListItemModel>;
  listActions:Array<ListItemActionsModel>;
  list:Array<any>;
  hasActions:boolean;
  hasSearch: boolean;

}
export class ListItemModel{
  HeaderText:string;
  PropertyName:string;
  SecondPropertyName: string;
  isObject:boolean;
  subProperty1:string = '';
  subProperty2: string = '';
}

export class ListItemActionsModel{
  URL:string;
  Name:string;
  Icon:string;
  callback:Function;
  service:any;
  params:Array<string>;
  isEnable:boolean;
  router:Router;
}
