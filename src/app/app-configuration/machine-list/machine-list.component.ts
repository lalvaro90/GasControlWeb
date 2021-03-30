import { Component, OnInit, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { ListModel } from 'src/app/forms/List-Item-Model';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { Machine } from 'src/app/models/Machine';
import { User } from 'src/app/models/User';
import { MachineService } from 'src/app/Services/machine.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {

  listMode: ListModel;
  loading = false;
  showList = false;
  user:User;

  constructor(private router:Router, private userService: UserService, private machineService:MachineService) {
    this.listMode = new ListModel();
    this.userService.loggedUser.subscribe(res => {
      this.user = res;
    });

    this.listMode.hasActions = true;
  }

  validateAccess(){
    let canDelete = false;
    let canEdit = false;
    let permDelete = 'machine_delete';
    let permEdit = 'machine_edit';
    let fullaccess = 'full_access';

    if(this.user.permissions.indexOf(permDelete)>-1){
      canDelete = true;
    }

    if(this.user.permissions.indexOf(permEdit)>-1){
      canEdit = true;
    }

    if(this.user.permissions.indexOf(fullaccess)>-1){
      canEdit = true;
      canDelete = true;
    }
    return {canDelete, canEdit}
  }

  ngOnInit() {
    

    let machine:Machine = null;
    this.listMode.listItems = [
      { HeaderText: 'Maquina', PropertyName: 'machineId', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
      { HeaderText: 'Marca', PropertyName: 'brand', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
      { HeaderText: 'Modelo', PropertyName: 'model', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
      { HeaderText: 'Serie', PropertyName: 'series', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
      { HeaderText: 'Capacidad L', PropertyName: 'tankCapacity', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
    ];
    
    this.listMode.listActions = [
      { service: this.userService, Name: 'Editar', URL: '/machine-edit', Icon: 'edit ', callback: undefined, params: ['id'], isEnable:this.validateAccess().canEdit, router:this.router },
      { service: this.userService, Name: 'Eliminar', URL: undefined, Icon: 'delete_sweep ', callback: this.deleteItem, params: undefined, isEnable:this.validateAccess().canDelete, router:this.router },
      { service: this.userService, Name: 'Imagenes', URL: '/images/machine/pictures/:id', Icon: 'image ', callback: undefined, params: ['id'], isEnable:this.validateAccess().canEdit, router:this.router },
    ];

    this.machineService.get().subscribe(res=> {
      this.listMode.list = res;
      this.showList = true;
    })
  }

  new(){
    this.router.navigate(['/machine-new']);
  }

  deleteItem(item: any, service: any, reload:Function) {
    let alertComponent: AlertItem = new AlertItem();
    alertComponent.type = 'warning';
    alertComponent.text = `Esta seguro de Eleminar la maquina (${item.name}, ${item.description})?`
    alertComponent.showCancelButton = true;
    alertComponent.showCloseButton = true;
    alertComponent.cancelButtonText = 'No, Regresar';
    alertComponent.confirmButtonText = 'Si, Eliminar';
    alertComponent.focusConfirm = true;

    alertComponent.Confirm().then(res => {
      if (res.dismiss != 'cancel') {
        service.delete(item.id).subscribe(res => {
          alertComponent.type = 'info';
          alertComponent.showCancelButton = false;
          alertComponent.showCloseButton = false;
          alertComponent.text = 'Proveedor eliminado Exitosamente!';
          alertComponent.Show();
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
          let utc  = Date.now();
          this.router.navigate(['/machine-list'],{queryParams:{ref:utc}});
        });
      }
    });

  }
}
