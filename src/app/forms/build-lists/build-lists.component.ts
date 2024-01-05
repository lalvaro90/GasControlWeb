import { Component, OnInit, Input } from '@angular/core';
import { ListModel, ListItemActionsModel, ListItemModel } from '../List-Item-Model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-build-lists',
  templateUrl: './build-lists.component.html',
  styleUrls: ['./build-lists.component.css']
})
export class BuildListsComponent implements OnInit {

  @Input()
  listBuilder:ListModel = new ListModel;
  displayedColumns: Array<string>;
  actionsColName:string = 'Acciones';
  loading:boolean = false;
  original:Array<any> = [];

  length = 0;
  pageSize = 100;
  pageSizeOptions: number[] = [24, 100, 200];

  constructor(private router: Router) {
    this.displayedColumns = new Array<string>();
  }

  ngOnInit() {
    this.listBuilder.listItems.forEach((it:ListItemModel) => {
      this.displayedColumns.push(it.PropertyName);
    });
    if(this.listBuilder.hasActions){
      this.displayedColumns.push(this.actionsColName);
    }
    this.original = this.listBuilder.list;
  }

  listAction(action:ListItemActionsModel, item:any, reload:any){
    if(action.URL){
      var params:any =  {queryParams:{}};
      if(action.params.length > 0){
        action.params.forEach((it:any) => {
          if(it.indexOf('.')>0){
            let values = (<string>it).split('.');
            params['queryParams'][values[0]] = values[1];
          }else{
            params['queryParams'][it] = item[it];
          }
        });
        this.router.navigate([action.URL], params);
      }
      else{
        this.router.navigate([action.URL]);
      }
    }else if(action.callback){
        action.callback(item,action.service, reload);
    }

  }

  page($event: any){
    this.loading = true;

    this.listBuilder.list = this.original.slice(($event.pageIndex)*$event.pageSize,($event.pageIndex+1)*$event.pageSize)

    this.loading = false;
  }


}
