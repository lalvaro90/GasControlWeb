import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListModel } from 'src/app/forms/List-Item-Model';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { ProjectsService } from 'src/app/Services/projects.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  listMode: ListModel;
  loading = false;
  showList = false;
  user:User;

  constructor(private router:Router, private userService: UserService, private projectService:ProjectsService) {
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
    

    let project:Project = null;
    this.listMode.listItems = [
      { HeaderText: 'Nombre', PropertyName: 'name', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
      { HeaderText: 'Detalles', PropertyName: 'details', SecondPropertyName:undefined, isObject:false, subProperty1:undefined, subProperty2: undefined },
      { HeaderText: 'Responsable 1', PropertyName: 'responsible1', SecondPropertyName:undefined, isObject:true, subProperty1:'firstName', subProperty2: 'lastName' },
      { HeaderText: 'Responsable 2', PropertyName: 'responsible2', SecondPropertyName:undefined, isObject:true, subProperty1:'firstName', subProperty2: 'lastName' },
    ];
    
    this.listMode.listActions = [
      { service: this.userService, Name: 'Editar', URL: '/project-edit', Icon: 'edit ', callback: undefined, params: ['id'], isEnable:this.validateAccess().canEdit, router:this.router },
      { service: this.userService, Name: 'Eliminar', URL: undefined, Icon: 'delete_sweep ', callback: this.deleteItem, params: undefined, isEnable:this.validateAccess().canDelete, router:this.router },
      { service: this.userService, Name: 'Imagenes', URL: '/images/project/pictures/:id', Icon: 'image ', callback: undefined, params: ['id'], isEnable:this.validateAccess().canEdit, router:this.router },
    ];

    this.projectService.get().subscribe(res=> {
      this.listMode.list = res;
      this.showList = true;
    })
  }

  new(){
    this.router.navigate(['/project-new']);
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
          this.router.navigate(['/project-list'],{queryParams:{ref:utc}});
        });
      }
    });

  }
}
