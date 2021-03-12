import { Component, OnInit } from '@angular/core';
import { ListModel } from 'src/app/forms/List-Item-Model';
import { Provider } from 'src/app/models/Provider';
import { Router } from '@angular/router';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/Services/user.service';
import { ProviderService } from 'src/app/Services/provider.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  listMode: ListModel;
  loading = false;
  showList = false;
  user:User;

  constructor(private router:Router, private userService: UserService, private providerService:ProviderService) {
    this.listMode = new ListModel();
    this.userService.loggedUser.subscribe(res => {
      this.user = res;
    });

    this.listMode.hasActions = true;
  }

  validateAccess(){
    let canDelete = false;
    let canEdit = false;
    let permDelete = 'providers_delete';
    let permEdit = 'providers_edit';
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
    

    let provider:Provider = null;
    this.listMode.listItems = [
      { HeaderText: 'Nombre', PropertyName: 'name', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
      { HeaderText: 'Correo Eléctornico', PropertyName: 'email', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
      { HeaderText: 'Telefono', PropertyName: 'phone', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
    ];
    
    this.listMode.listActions = [
      { service: this.userService, Name: 'Editar', URL: '/provider-edit', Icon: 'edit ', callback: undefined, params: ['id'], isEnable:this.validateAccess().canEdit, router:this.router },
      { service: this.userService, Name: 'Eliminar', URL: undefined, Icon: 'delete_sweep ', callback: this.deleteItem, params: undefined, isEnable:this.validateAccess().canDelete, router:this.router },
    ];

    this.providerService.get().subscribe(res=> {
      this.listMode.list = res;
      this.showList = true;
    })
  }

  new(){
    this.router.navigate(['/provider-new']);
  }

  deleteItem(item: any, service: any, reload:Function) {
    let alertComponent: AlertItem = new AlertItem();
    alertComponent.type = 'warning';
    alertComponent.text = `Esta seguro de Eleminar el Proveedor (${item.name}, ${item.description})?`
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
          this.router.navigate(['/provider-list'],{queryParams:{ref:utc}});
        });
      }
    });

  }

}
