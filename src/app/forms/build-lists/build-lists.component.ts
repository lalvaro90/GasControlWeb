import { Component, OnInit, Input } from '@angular/core';
import { ListModel, ListItemActionsModel } from '../List-Item-Model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-build-lists',
  templateUrl: './build-lists.component.html',
  styleUrls: ['./build-lists.component.css']
})
export class BuildListsComponent implements OnInit {

  @Input()
  listBuilder: ListModel;
  displayedColumns: Array<string>;
  actionsColName: string = 'Acciones';
  loading: boolean;
  original: Array<any>;
  searchText: string = 'Buscar';

  length = 0;
  pageSize = 100;
  pageSizeOptions: number[] = [24, 100, 200];

  constructor(private router: Router) {
    this.displayedColumns = new Array<string>();
  }

  ngOnInit() {
    this.listBuilder.listItems.forEach(it => {
      this.displayedColumns.push(it.PropertyName);
    });
    if (this.listBuilder.hasActions) {
      this.displayedColumns.push(this.actionsColName);
    }
    this.original = this.listBuilder.list;
  }

  listAction(action: ListItemActionsModel, item: any, reload: Function) {

    if (action.URL) {
      if (action.URL.indexOf(':') > -1) {
        let url = action.URL;
        action.params.forEach(it => {
          url = url.replace(`:${it}`, item[it]);
        });
        this.router.navigate([url]);
      } else {
        var params = { queryParams: {} };
        if (action.params.length > 0) {
          action.params.forEach(it => {
            params['queryParams'][it] = item[it];
          });
          this.router.navigate([action.URL], params);
        }
        else {
          this.router.navigate([action.URL]);
        }
      }

    } else if (action.callback) {
      action.callback(item, action.service, reload);
    }

  }

  search($event) {
    var value = $event.target.value;
    var out = new Array<any>();
    if (value) {
      this.displayedColumns.forEach(y => {
        this.original.forEach(x => {
          if(x[y]?.indexOf(value)>-1){
            if(out.indexOf(x) < 0){
              out.push(x);
            }
          }
        })
      });      
      this.listBuilder.list = out;
      console.log('output',this.listBuilder.list);
    }
    else{
      this.listBuilder.list = this.original;
    }
  }

  page($event) {
    this.loading = true;

    this.listBuilder.list = this.original.slice(($event.pageIndex) * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize)

    this.loading = false;
  }


}
