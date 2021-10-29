import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Provider } from 'src/app/models/Provider';
import { InputType, FormItem, FormBuilder } from 'src/app/models/FormItem';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { Configuration } from 'src/app/models/Configuration';
import { ConfigService } from 'src/app/Services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/Services/provider.service';

@Component({
  selector: 'app-provider-new',
  templateUrl: './provider-new.component.html',
  styleUrls: ['./provider-new.component.css']
})
export class ProviderNewComponent implements OnInit {
  formItem = new FormBuilder;
  alertComponent: AlertItem;
  formItemReady = false;
  provider: Provider;
  config: Configuration;
  loading = false;

  constructor(
    private providerService: ProviderService,
    private configService: ConfigService,
    public router: Router,
    private route: ActivatedRoute) {
    this.alertComponent = new AlertItem();
    this.provider = new Provider();
  }

  ngOnInit() {
    this.loading = true;
    this.configService.get().subscribe(res => {
      this.config = res[0];
      this.loading = false;
      this.route.queryParams.subscribe(params => {
        let id = params['id'];
        if (id) {
          this.providerService.getById(id).subscribe(res => {
            this.provider = res;
            this.setupForm(this.provider);
          });
        }
        else {
          this.setupForm();
        }
      });
    });
  }

  private setupForm(item: Provider = null) {
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
        name: "Correo Eléctronico",
        placeHolder: 'Correo Eléctronico',
        type: InputType.email,
        propertyName: 'email',
        value: item ? item.email : '',
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Teléfono",
        placeHolder: 'Teléfono',
        type: InputType.text,
        propertyName: 'phone',
        value: item ? item.phone : '',
        isReadOnly: false,
        isRequired:true,
        textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
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

    this.loading = false;

    this.formItem.formItems = it;
    this.formItem.service = this.providerService;
    this.formItem.formName = 'Crear Nuevo Proveedor de Compra';
    this.formItem.hasSubmit = true;
    this.formItem.hasPrint = false;
    this.formItem.printSectionId = 'p-barcode';
    this.formItem.printStyleRef = '../../assets/print-barcode.css'
    this.formItem.printText = "Imprimir";
    this.formItem.submitText = "Guardar";
    this.formItem.submit = this.submitNew;
    this.formItem.alertComponent = this.alertComponent;
    this.formItem.router = this.router;
    this.formItem.returnType = new Provider();

    this.formItem.hasCancel = true;
    this.formItem.cancelText = "Cancelar";
    this.formItem.cancel = this.cancelNew;

    this.formItemReady = true;
  }

  submitNew(result: Provider, service: ProviderService) {
    this.loading = true;
    result.id = Number(result.id);
    if (result.id) {
      service.edit(result, result.id).subscribe(res => {
        this.alertComponent.text = 'Proveedor modificado exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['/provider-list']);
        });
      });
    } else {
      service.new(result).subscribe(res => {
        this.alertComponent.text = 'Proveedor creado exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['/provider-list']);
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
          this.router.navigate(['/provider-list']);
        }
      });
    } else {
      this.router.navigate(['/provider-list']);
    }
  }

}
