import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { Configuration } from 'src/app/models/Configuration';
import { FormBuilder, FormItem, InputType } from 'src/app/models/FormItem';
import { Machine } from 'src/app/models/Machine';
import { Project } from 'src/app/models/Project';
import { User, UserType } from 'src/app/models/User';
import { ConfigService } from 'src/app/Services/config.service';
import { MachineService } from 'src/app/Services/machine.service';
import { ProjectsService } from 'src/app/Services/projects.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-machine-new',
  templateUrl: './machine-new.component.html',
  styleUrls: ['./machine-new.component.css']
})
export class MachineNewComponent implements OnInit {
  formItem = new FormBuilder;
  alertComponent: AlertItem;
  formItemReady = false;
  machine: Machine;
  config: Configuration;
  loading = false;
  userTypes: Array<UserType>;
  users:Array<User>;
  projects:Array<Project>;
  isTank = [{id:false, name:'No'}, {id:true, name:'Si'}];

  constructor(
    private machineService: MachineService,
    private configService: ConfigService,
    private userService: UserService,
    private projectService: ProjectsService,
    public router: Router,
    private route: ActivatedRoute) {
    this.alertComponent = new AlertItem();
    this.machine = new Machine();
    
  }

  ngOnInit() {
    this.loading = true;
    this.projectService.get().subscribe(res => {
      this.projects = res;
      this.userService.get().subscribe(res => {this.users = res;
        this.configService.get().subscribe(res => {
          this.config = res[0];
          this.loading = false;
          this.route.queryParams.subscribe(params => {
            let id = params['id'];
            if (id) {
              this.machineService.getById(id).subscribe(res => {
                debugger;
                this.machine = res;
                this.setupForm(this.machine);
              });
            }
            else {
              this.setupForm();
            }
          });
        });
      }); 
    })   
  }

  private setupForm(item: Machine = null) {
    this.formItem = new FormBuilder();
    this.formItem.formItems = new Array<FormItem>();
    let it = <Array<FormItem>>[
      {
        name: "Numero de Maquina",
        placeHolder: 'Numero de Maquina',
        type: InputType.text,
        propertyName: 'machineId',
        value: item ? item.machineId : '',
        isReadOnly: false,
        isRequired: true,
      },
      {
        name: "Marca",
        placeHolder: 'Marca',
        type: InputType.text,
        propertyName: 'brand',
        value: item ? item.brand : '',
        isReadOnly: false,
        isRequired: true,
      },
      {
        name: "Modelo",
        placeHolder: 'Modelo',
        type: InputType.text,
        propertyName: 'model',
        value: item ? item.model : '',
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Serie",
        placeHolder: 'Serie',
        type: InputType.text,
        propertyName: 'series',
        value: item ? item.series : '',
        isReadOnly: false,
        isRequired:true,
        // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      {
        name: "Descripción",
        placeHolder: 'Descripción',
        type: InputType.text,
        propertyName: 'description',
        value: item ? item.description : '',
        isReadOnly: false,
        isRequired:true,
        // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      {
        name: "Fecha de Compra",
        placeHolder: 'Fecha de Compra',
        type: InputType.date,
        propertyName: 'purchaseDate',
        value: item ? item.purchaseDate : '',
        isReadOnly: false,
        isRequired:true,
        // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      {
        name: "Capacidad del Tanque(L)",
        placeHolder: 'Capacidad del Tanque(L)',
        type: InputType.number,
        propertyName: 'tankCapacity',
        value: item ? item.tankCapacity : '',
        isReadOnly: false,
        isRequired:true,
        // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      {
        name: "Ubicación",
        placeHolder: 'Ubicación',
        type: InputType.select,
        propertyName: 'location',
        value: item ? item.location : '',
        isReadOnly: false,
        isRequired:true,
        source: this.projects,
        sourceText: 'name',
        sourceValue: 'id'
        // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      {
        name: "Es Tanqueta",
        placeHolder: 'Es Tanqueta',
        type: InputType.select,
        propertyName: 'isTank',
        value: item ? item.isTank : false,
        isReadOnly: false,
        isRequired:true,
        source: this.isTank,
        sourceText: 'name',
        sourceValue: 'id'
        // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      {
        name: "id",
        placeHolder: 'id',
        type: InputType.hidden,
        propertyName: 'id',
        value: item ? <number>item.id : 0,
        isReadOnly: false
      },
    ];
    console.log('Machine', it);

    this.loading = false;

    this.formItem.formItems = it;
    this.formItem.service = this.machineService;
    this.formItem.formName = item? 'Editar Maquina' : 'Crear Nueva Maquina';
    this.formItem.hasSubmit = true;
    this.formItem.hasPrint = false;
    this.formItem.printSectionId = 'p-barcode';
    this.formItem.printStyleRef = '../../assets/print-barcode.css'
    this.formItem.printText = "Imprimir";
    this.formItem.submitText = "Guardar";
    this.formItem.submit = this.submitNew;
    this.formItem.alertComponent = this.alertComponent;
    this.formItem.router = this.router;
    this.formItem.returnType = new Machine();

    this.formItem.hasCancel = true;
    this.formItem.cancelText = "Cancelar";
    this.formItem.cancel = this.cancelNew;

    this.formItemReady = true;
  }

  submitNew(result: Machine, service: MachineService) {
    this.loading = true;
    result.id = Number(result.id);
    if (result.id) {
      service.edit(result, result.id).subscribe(res => {
        this.alertComponent.text = 'Maquina modificada exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['/machine-list']);
        });
      });
    } else {
      service.new(result).subscribe(res => {
        this.alertComponent.text = 'Maquina creada exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['/machine-list']);
        });
      })
    }
  }

  cancelNew(form: FormGroup) {
    this.alertComponent.type = 'warning';
    this.alertComponent.text = 'Esta seguro de cancelar? <br> si tiene cambios pendies los perderá.'
    this.alertComponent.showCancelButton = true;
    this.alertComponent.showCloseButton = true;
    this.alertComponent.cancelButtonText = 'No, Regresar';
    this.alertComponent.confirmButtonText = 'Si, Cancelar';
    this.alertComponent.focusConfirm = true;

    if (form.touched) {
      this.alertComponent.Confirm().then(res => {
        if (res.dismiss != 'cancel') {
          this.router.navigate(['/machine-list']);
        }
      });
    } else {
      this.router.navigate(['/machine-list']);
    }
  }

}
