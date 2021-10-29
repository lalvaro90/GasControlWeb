import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { Configuration } from 'src/app/models/Configuration';
import { FormBuilder, FormItem, InputType } from 'src/app/models/FormItem';
import { ConfigService } from 'src/app/Services/config.service';

@Component({
  selector: 'app-main-configuration',
  templateUrl: './main-configuration.component.html',
  styleUrls: ['./main-configuration.component.css']
})
export class MainConfigurationComponent implements OnInit {
  formItem = new FormBuilder;
  alertComponent: AlertItem;
  formItemReady = false;
  config: Configuration;
  loading = false;

  constructor(
    private configService: ConfigService,
    public router: Router,
    private route: ActivatedRoute) {
    this.alertComponent = new AlertItem();
    this.config = new Configuration();
  }

  ngOnInit() {
    this.loading = true;

    this.configService.get().subscribe(res => {
      this.config = res[0];
      this.setupForm(this.config);
    });
  }

  private setupForm(item: Configuration = null) {
    this.formItem = new FormBuilder();
    this.formItem.formItems = new Array<FormItem>();
    let it = <Array<FormItem>>[
      {
        name: "Director de la Institución",
        placeHolder: 'Director de la Institución',
        type: InputType.text,
        propertyName: 'cEOName',
        value: item ? item.cEOName : '',
        isReadOnly: false,
        isRequired: true,
      },
      {
        name: "Nombre del Supervisor",
        placeHolder: 'Nombre del Supervisor',
        type: InputType.text,
        propertyName: 'supervisor',
        value: item ? item.supervisor : '',
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Nombre de la Institución",
        placeHolder: 'Nombre de la Institución',
        type: InputType.text,
        propertyName: 'companyName',
        value: item ? item.companyName : '',
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Teléfono de la Institución",
        placeHolder: 'Teléfono de la Institución',
        type: InputType.text,
        propertyName: 'phoneNumber',
        value: item ? item.phoneNumber : '',
        isRequired: true,
        isReadOnly: false,
        textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      },
      {
        name: "Simbolo de Moneda",
        placeHolder: 'Simbolo de Moneda',
        type: InputType.text,
        propertyName: 'currency',
        value: item ? item.currency : '',
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Logo",
        placeHolder: 'Logo',
        type: InputType.file,
        propertyName: 'companyLogo',
        value: item ? item.companyLogo : '',
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Margen de Error Horimietro/Km",
        placeHolder: 'Margen de Error Horimietro/Km',
        type: InputType.checkbox,
        propertyName: 'hourKmValueMargin',
        value: item ? item.hourKmValueMargin : false,
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Nivel critico de tanqueta",
        placeHolder: 'Nivel critico de tanqueta',
        type: InputType.checkbox,
        propertyName: 'tankCritialLevel',
        value: item ? item.tankCritialLevel : false,
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Nivel de Advertencia de tanqueta",
        placeHolder: 'Nivel de Advertencia de tanqueta',
        type: InputType.checkbox,
        propertyName: 'tankWarningLevel',
        value: item ? item.tankWarningLevel : false,
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "Nivel Normal de tanqueta",
        placeHolder: 'Nivel Normal de tanqueta',
        type: InputType.checkbox,
        propertyName: 'tankWarningLevel',
        value: item ? item.tankOkLevel : false,
        isRequired: true,
        isReadOnly: false
      },
      {
        name: "id",
        placeHolder: 'id',
        type: InputType.hidden,
        propertyName: 'id',
        value: item ? item.id : 0,
        isReadOnly: false,
        isRequired: false
      },
    ];

    this.loading = false;

    this.formItem.formItems = it;
    this.formItem.service = this.configService;
    this.formItem.formName = 'Configuración General';
    this.formItem.hasSubmit = true;
    this.formItem.hasPrint = false;
    this.formItem.printSectionId = 'p-barcode';
    this.formItem.printStyleRef = '../../assets/print-barcode.css'
    this.formItem.printText = "Imprimir";
    this.formItem.submitText = "Guardar";
    this.formItem.submit = this.submitNew;
    this.formItem.alertComponent = this.alertComponent;
    this.formItem.router = this.router;
    this.formItem.returnType = new Configuration();

    this.formItem.hasCancel = true;
    this.formItem.cancelText = "Cancelar";
    this.formItem.cancel = this.cancelNew;

    this.formItemReady = true;
  }

  submitNew(result: Configuration, service: ConfigService) {
    this.loading = true;
    if (result.id) {
      service.edit(result, result.id).subscribe(res => {
        this.alertComponent.text = 'Configuración modificada exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['control/control-dashboard']);
        });
      });
    } else {
      service.new(result).subscribe(res => {
        this.alertComponent.text = 'Configuración creada exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['control/control-dashboard']);
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
          this.router.navigate(['control/control-dashboard']);
        }
      });
    } else {
      this.router.navigate(['control/control-dashboard']);
    }
  }

}

