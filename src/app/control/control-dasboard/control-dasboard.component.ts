import { Component, OnInit } from '@angular/core';
import { ListModel } from 'src/app/forms/List-Item-Model';
import { Machine } from 'src/app/models/Machine';
import { MachineGasRefile } from 'src/app/models/MachineGasRefile';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { MachineGasRefileService } from 'src/app/Services/machine-gas-refile.service';
import { MachineService } from 'src/app/Services/machine.service';
import { ProjectsService } from 'src/app/Services/projects.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-control-dasboard',
  templateUrl: './control-dasboard.component.html',
  styleUrls: ['./control-dasboard.component.css']
})
export class ControlDasboardComponent implements OnInit {

  refiles: Array<MachineGasRefile>;
  listMode: ListModel;
  tanks: Array<Machine>;
  machines: Array<Machine>;
  projects: Array<Project>;
  user: User;
  loading = false;
  showList = false;
  showCapacities = false;
  constructor(private machineRefileService: MachineGasRefileService,
    private userService: UserService,
    private machineService: MachineService,
    private projectService: ProjectsService,
  ) { }

  ngOnInit(): void {
    this.listMode = new ListModel();
    this.tanks = new Array<Machine>();
    this.machines = new Array<Machine>();
    this.projects = new Array<Project>();
    this.userService.loggedUser.subscribe(res => {
      this.user = res;
    });

    this.listMode.hasActions = false;
    this.getTodayData();
  }

  getCurentCapacity(m:Machine):number{
    let cap = 0;
    try{

        cap = (m.currentCapacity / m.tankCapacity) * 100
    }catch{
        console.log('Error Calculating Tank Capacity')
    }
    return cap;
}

  async getTodayData() {
    await this.machineRefileService.getTodayData().toPromise().then(res => {
      this.refiles = res;
      this.initListData();
      this.showList = true;
    });
    await this.machineService.get().toPromise().then(res => {
      this.machines = res.filter(x => x.isTank == false);
      this.tanks = res.filter(x => x.isTank == true);
      this.showCapacities = true;
    });
    await this.projectService.get().toPromise().then(res => {
      this.projects = res;
    })
  }

  initListData() {
    let project: MachineGasRefile = null;
    this.listMode.listItems = [
      { HeaderText: 'Maquina', PropertyName: 'refilingMaching', SecondPropertyName: undefined, isObject: true, subProperty1: 'machineId', subProperty2: 'description' },
      { HeaderText: 'Proyecto', PropertyName: 'project', SecondPropertyName: undefined, isObject: true, subProperty1: 'name', subProperty2: undefined },
      { HeaderText: 'Listros Dispensados', PropertyName: 'liters', SecondPropertyName: undefined, isObject: false, subProperty1: '', subProperty2: '' },
      { HeaderText: 'Tanqueta', PropertyName: 'tank', SecondPropertyName: undefined, isObject: true, subProperty1: 'machineId', subProperty2: 'description' },
    ];

    this.listMode.list = this.refiles;

    // this.listMode.listActions = [
    //   { service: this.userService, Name: 'Editar', URL: '/project-edit', Icon: 'edit ', callback: undefined, params: ['id'], isEnable:this.validateAccess().canEdit, router:this.router },
    //   { service: this.userService, Name: 'Eliminar', URL: undefined, Icon: 'delete_sweep ', callback: this.deleteItem, params: undefined, isEnable:this.validateAccess().canDelete, router:this.router },
    //   { service: this.userService, Name: 'Imagenes', URL: '/images/project/pictures/:id', Icon: 'image ', callback: undefined, params: ['id'], isEnable:this.validateAccess().canEdit, router:this.router },
    // ];
  }

  validateAccess() {
    let canDelete = false;
    let canEdit = false;
    let permDelete = 'machine_delete';
    let permEdit = 'machine_edit';
    let fullaccess = 'full_access';

    if (this.user.permissions.indexOf(permDelete) > -1) {
      canDelete = true;
    }

    if (this.user.permissions.indexOf(permEdit) > -1) {
      canEdit = true;
    }

    if (this.user.permissions.indexOf(fullaccess) > -1) {
      canEdit = true;
      canDelete = true;
    }
    return { canDelete, canEdit }
  }

}
