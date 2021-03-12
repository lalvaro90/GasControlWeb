import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { Configuration } from 'src/app/models/Configuration';
import { FormBuilder, FormItem, InputType } from 'src/app/models/FormItem';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { ConfigService } from 'src/app/Services/config.service';
import { ProjectsService } from 'src/app/Services/projects.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {
  formItem = new FormBuilder;
  alertComponent: AlertItem;
  formItemReady = false;
  project: Project;
  config: Configuration;
  loading = false;
  users:Array<User>;

  constructor(
    private service: ProjectsService,
    private configService: ConfigService,
    private userService:UserService,
    public router: Router,
    private route: ActivatedRoute) {
    this.alertComponent = new AlertItem();
    this.project = new Project();
  }

  ngOnInit() {
    this.loading = true;

    this.userService.get().subscribe(res => {
      this.users = res;
      this.configService.get().subscribe(res => {
        this.config = res[0];
        this.loading = false;
        this.route.queryParams.subscribe(params => {
          let id = params['id'];
          if (id) {
            this.service.getById(id).subscribe(res => {
              this.project = res;
              this.setupForm(this.project);
            });
          }
          else {
            this.setupForm();
          }
        });
      });
    });
  }

  private setupForm(item: Project = null) {
    this.formItem = new FormBuilder();
    this.formItem.formItems = new Array<FormItem>();
    let it = <Array<FormItem>>[
      {
        name: "Nombre",
        placeHolder: 'Nombre',
        type: InputType.text,
        propertyName: 'name',
        value: item ? item.name : '',
        isReadOnly: false,
        isRequired: true,
      },
      {
        name: "Detalles",
        placeHolder: 'Detalles',
        type: InputType.email,
        propertyName: 'details',
        value: item ? item.details : '',
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Responsable 1",
        placeHolder: 'Responsable 1',
        type: InputType.select,
        propertyName: 'responsible1',
        value: item ? item.responsible1.id : '',
        source: this.users,
        sourceText: 'firstName',
        secondText: 'lastName',
        sourceValue: 'id',
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Responsable 2",
        placeHolder: 'Responsable 2',
        type: InputType.select,
        propertyName: 'responsible2',
        value: item ? item.responsible2.id : '',
        source: this.users,
        sourceText: 'firstName',
        secondText: 'lastName',
        sourceValue: 'id',
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Ubicación",
        placeHolder: 'Ubicación',
        type: InputType.location,
        propertyName: 'location',
        value: item ? item.location : '',
        isRequired: false,
        isReadOnly: false
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

  console.log('Form Item',it);
  console.log('Proyect',item);

    this.loading = false;

    this.formItem.formItems = it;
    this.formItem.service = this.service;
    this.formItem.formName = item? 'Editar Proyecto' : 'Crear Nuevo Proyecto';
    this.formItem.hasSubmit = true;
    this.formItem.hasPrint = false;
    this.formItem.printSectionId = 'p-barcode';
    this.formItem.printStyleRef = '../../assets/print-barcode.css'
    this.formItem.printText = "Imprimir";
    this.formItem.submitText = "Guardar";
    this.formItem.submit = this.submitNew;
    this.formItem.alertComponent = this.alertComponent;
    this.formItem.router = this.router;
    this.formItem.returnType = new Project();

    this.formItem.hasCancel = true;
    this.formItem.cancelText = "Cancelar";
    this.formItem.cancel = this.cancelNew;

    this.formItemReady = true;
  }

  submitNew(result: Project, service: ProjectsService) {
    this.loading = true;
    result.id = Number(result.id);
    if (result.id) {
      service.edit(result, result.id).subscribe(res => {
        this.alertComponent.text = 'Proveedor modificado exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['/project-list']);
        });
      });
    } else {
      service.new(result).subscribe(res => {
        this.alertComponent.text = 'Proveedor creado exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['/project-list']);
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
          this.router.navigate(['/project-list']);
        }
      });
    } else {
      this.router.navigate(['/project-list']);
    }
  }

}