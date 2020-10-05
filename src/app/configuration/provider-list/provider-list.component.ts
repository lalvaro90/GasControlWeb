import { Component, OnInit } from '@angular/core';
import { AssetProviderService } from 'src/app/Services/asset-provider.service';
import { ListModel } from 'src/app/forms/List-Item-Model';
import { Provider } from 'src/app/models/Provider';
import { Router } from '@angular/router';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/Services/user.service';

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

  constructor(private providerService: AssetProviderService, private router:Router, private userService: UserService) {
    this.listMode = new ListModel();
    this.userService.loggedUser.subscribe(res => {
      this.user = res;
    });

    this.listMode.hasActions = true;
  }

  ngOnInit() {
    let permDelete = 'providers_delete';
    let permEdit = 'providers_edit';
    let canDelete = false;
    let canEdit = false;

    if(this.user.permissions.indexOf(permDelete)>-1){
      canDelete = true;
    }

    if(this.user.permissions.indexOf(permEdit)>-1){
      canEdit = true;
    }

    let provider:Provider = null;
    this.listMode.listItems = [
      { HeaderText: 'Nombre', PropertyName: 'name', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
      { HeaderText: 'Correo Eléctornico', PropertyName: 'email', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
      { HeaderText: 'Telefono', PropertyName: 'phone', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
    ];

    this.listMode.listActions = [
      { service: this.providerService, Name: 'Editar', URL: '/provider-edit', Icon: 'edit ', callback: undefined, params: ['id'], isEnable:canDelete, router:this.router },
      { service: this.providerService, Name: 'Eliminar', URL: undefined, Icon: 'delete_sweep ', callback: this.deleteItem, params: undefined, isEnable:canDelete, router:this.router},
    ];

    this.loading = true;
    this.providerService.get().subscribe(res => {
      this.listMode.list = res;
      this.loading = false;
      this.showList = true;
    })
  }

  new(){
    this.router.navigate(['/provider-new']);
  }

  deleteItem(item: any, service: any, reload:Function) {
    let alertComponent: AlertItem = new AlertItem();
    alertComponent.type = 'warning';
    alertComponent.text = `Esta seguro de Eleminar la depreciacion (${item.name}, ${item.description})?`
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
