import { Component, OnInit } from '@angular/core';
import { ListModel } from 'src/app/forms/List-Item-Model';
import { UserService } from 'src/app/Services/user.service';
import { Router, RouteReuseStrategy } from '@angular/router';
import { User } from 'src/app/models/User';
import { AlertItem } from 'src/app/helpers/AlertItem';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listMode: ListModel;
  loading = false;
  showList = false;
  user:User;

  constructor(private userService: UserService, private router:Router) {
    this.listMode = new ListModel();
    this.userService.loggedUser.subscribe(res => {
      this.user = res;
    });

    this.listMode.hasActions = true;
    this.listMode.hasSearch = true;
  }

  validateAccess(){
    let canDelete = false;
    let canEdit = false;
    let permDelete = 'user_delete';
    let permEdit = 'user_edit';
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
    this.validateAccess();

    this.listMode.listItems = [
      { HeaderText: 'Nombre', PropertyName: 'firstName', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined},
      { HeaderText: 'Apellidos', PropertyName: 'lastName', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined},
      { HeaderText: 'Correo Electronico', PropertyName: 'email', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined},
      { HeaderText: 'Telefono', PropertyName: 'phoneNumber', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined},
      { HeaderText: 'Último Ingreso', PropertyName: 'lastLogin', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined},
    ];

    this.listMode.listActions = [
      { service: this.userService, Name: 'Editar', URL: '/user-edit', Icon: 'edit ', callback: undefined, params: ['id'], isEnable:this.validateAccess().canEdit, router:this.router },
      { service: this.userService, Name: 'Eliminar', URL: undefined, Icon: 'delete_sweep ', callback: this.deleteItem, params: undefined, isEnable:this.validateAccess().canDelete, router:this.router },
    ];

    this.loading = true;
    this.userService.get().subscribe(res => {
      this.listMode.list = res;
      this.loading = false;
      this.showList = true;
    })
  }

  new(){
    this.router.navigate(['/user-new']);
  }

  deleteItem(item: any, service: any, reload:Function) {
    let alertComponent: AlertItem = new AlertItem();
    alertComponent.type = 'warning';
    alertComponent.text = `Esta seguro de Eleminar el Usuario (${item.firstName} ${item.lastName})?`
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
          alertComponent.text = 'Usuario eliminado Exitosamente!';
          alertComponent.Show();
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
          let utc  = Date.now();
          this.router.navigate(['/user-list'],{queryParams:{ref:utc}});
        });
      }
    });

  }

}
