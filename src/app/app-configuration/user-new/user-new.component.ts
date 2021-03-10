import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/models/User';
import { FormBuilder, FormItem, InputType } from 'src/app/models/FormItem';
import { FormGroup } from '@angular/forms';
import { ConfigService } from 'src/app/Services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { Configuration } from 'src/app/models/Configuration';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  formItem = new FormBuilder;
  alertComponent: AlertItem;
  formItemReady = false;
  config: Configuration;
  user:User;
  loading = false;

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    public router: Router,
    private route: ActivatedRoute) {
    this.alertComponent = new AlertItem();
  }

  ngOnInit() {
    this.loading = true;

    this.configService.get().subscribe(res => {
      this.config = res[0];
      this.route.queryParams.subscribe(params => {
        let id = params['id'];
        if (id) {
          this.userService.getById(id).subscribe(res => {
            this.user = res;
            this.setupForm(this.user);
          });
        }
        else {
          this.setupForm();
        }
      });
    });
  }

  private setupForm(item: User = null) {
    this.formItem = new FormBuilder();
    this.formItem.formItems = new Array<FormItem>();
    let it = <Array<FormItem>>[
    {
      name: "Nombre",
      placeHolder: 'Nombre',
      type: InputType.text,
      propertyName: 'firstName',
      value: item ? item.firstName : '',
      isReadOnly: false,
      isRequired: true,
    },
    {
      name: "Apellidos",
      placeHolder: 'Apellidos',
      type: InputType.text,
      propertyName: 'lastName',
      value: item ? item.lastName : '',
      isRequired: true,
      isReadOnly: false
    },
    {
      name: "Correo Electronico",
      placeHolder: 'Correo Electronico',
      type: InputType.email,
      propertyName: 'email',
      value: item ? item.email : '',
      isRequired: true,
      isReadOnly: false
    },
    {
      name: "Teléfono Celular",
      placeHolder: 'Teléfono Celular',
      type: InputType.text,
      propertyName: 'mobileNumber',
      value: item ? item.mobileNumber: '',
      textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      isRequired: true,
      isReadOnly: false,

    },
    {
      name: "Teléfono",
      placeHolder: 'Teléfono',
      type: InputType.text,
      propertyName: 'phoneNumber',
      value: item ? item.phoneNumber : '',
      isReadOnly: false,
      textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Contraseña",
      placeHolder: 'Contraseña',
      type: InputType.password,
      propertyName: 'password',
      value: item ? item.password : '',
      isReadOnly: false,
    },
    {
      name: "status",
      placeHolder: 'status',
      type: InputType.hidden,
      propertyName: 'isActive',
      value: item ? item.isActive : true,
      isReadOnly: false
    },
    {
      name: "id",
      placeHolder: 'id',
      type: InputType.hidden,
      propertyName: 'id',
      value: item ? item.id : 0,
      isReadOnly: false
    },
    ];

    this.loading = false;

    this.formItem.formItems = it;
    this.formItem.service = this.userService;
    this.formItem.formName = 'Crear Nuevo Usuario';
    this.formItem.hasSubmit = true;
    this.formItem.hasPrint = false;
    this.formItem.printSectionId = 'p-barcode';
    this.formItem.printStyleRef = '../../assets/print-barcode.css'
    this.formItem.printText = "Imprimir";
    this.formItem.submitText = "Guardar";
    this.formItem.submit = this.submitNew;
    this.formItem.alertComponent = this.alertComponent;
    this.formItem.router = this.router;
    this.formItem.returnType = new User();

    this.formItem.hasCancel = true;
    this.formItem.cancelText = "Cancelar";
    this.formItem.cancel = this.cancelNew;

    this.formItemReady = true;
  }

  submitNew(result: User, service: UserService) {
    this.loading = true;
    let pass = window.btoa(result.password);
    result.password = pass;
    if (result.id) {
      service.edit(result, result.id).subscribe(res => {
        this.alertComponent.text = 'Usuario modificado exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['/user-list']);
        });
      });
    } else {
      service.new(result).subscribe(res => {
        this.alertComponent.text = 'Usuario creado exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['/user-list']);
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

    if(form.touched){
      this.alertComponent.Confirm().then(res => {
        if (res.dismiss != 'cancel') {
          this.router.navigate(['/user-list']);
        }
      });
    }else{
      this.router.navigate(['/user-list']);
    }
  }

}
