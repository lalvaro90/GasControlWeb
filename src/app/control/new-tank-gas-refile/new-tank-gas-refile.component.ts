import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomaticBuildFormsComponent } from 'src/app/forms/build-forms/build-forms.component';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { Configuration } from 'src/app/models/Configuration';
import { FormBuilder, FormItem, InputType } from 'src/app/models/FormItem';
import { Machine } from 'src/app/models/Machine';
import { Project } from 'src/app/models/Project';
import { Provider } from 'src/app/models/Provider';
import { TankGasRefile } from 'src/app/models/TankGasRefile';
import { User } from 'src/app/models/User';
import { ConfigService } from 'src/app/Services/config.service';
import { MachineService } from 'src/app/Services/machine.service';
import { ProjectsService } from 'src/app/Services/projects.service';
import { ProviderService } from 'src/app/Services/provider.service';
import { TankGasRefilService } from 'src/app/Services/tank-gas-refil.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-new-tank-gas-refile',
  templateUrl: './new-tank-gas-refile.component.html',
  styleUrls: ['./new-tank-gas-refile.component.css']
})
export class NewTankGasRefileComponent implements OnInit {
  formItem = new FormBuilder;
  alertComponent: AlertItem;
  formItemReady = false;
  tankGasRefile: TankGasRefile;
  config: Configuration;
  loading = false;
  users: Array<User>;
  projects: Array<Project>;
  providers: Array<Provider>
  tanks: Array<Machine>;
  context:AutomaticBuildFormsComponent;
  isTank: Array<TankOptions> = [{ isTank: false, name: 'No' }, { isTank: true, name: 'Si' }];

  constructor(
    private machineService: MachineService,
    private configService: ConfigService,
    private userService: UserService,
    private projectService: ProjectsService,
    private tankGasRefileService: TankGasRefilService,
    private providerService: ProviderService,
    public router: Router,
    private route: ActivatedRoute) {
    this.alertComponent = new AlertItem();
    this.projects = new Array<Project>();
    this.users = new Array<User>();

  }

  ngOnInit() {
    this.LoadData()
  }

  private async LoadData() {
    this.loading = true;
    await this.projectService.get().toPromise().then(res => {
      this.projects = res;
    });
    await this.userService.get().toPromise().then(res => { this.users = res; });
    await this.configService.get().toPromise().then(res => { this.config = res[0]; });
    await this.machineService.get().toPromise().then(res => {
      this.tanks = res.filter(x => x.isTank == true);
    });
    await this.providerService.get().toPromise().then(res => this.providers = res);

    this.route.queryParams.subscribe(async params => {
      let id = params['id'];
      if (id) {
        await this.tankGasRefileService.getById(id).toPromise().then(res => {
          this.tankGasRefile = res;
          this.setupForm(this.tankGasRefile);
        });
      } else {
        this.setupForm();
      }
    });
  }

  private setupForm(item: TankGasRefile = null) {
    this.formItem = new FormBuilder();
    this.formItem.formItems = new Array<FormItem>();
    let it = <Array<FormItem>>[{
      name: "Proveedro",
      placeHolder: 'Equipo',
      type: InputType.select,
      propertyName: 'provider',
      value: item ? item.provider : '',
      isReadOnly: false,
      isRequired: true,
      sourceText: 'name',
      sourceValue: 'id',
      source: this.providers,
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Cantidad de Litros",
      placeHolder: 'Cantidad de Litros',
      type: InputType.number,
      propertyName: 'litersCount',
      value: item ? item.litersCount : '',
      isReadOnly: true,
      isRequired: true,
    },
    {
      name: "Precio Actual del Combustible",
      placeHolder: 'Precio Actual del Combustible',
      type: InputType.number,
      propertyName: 'currentPrice',
      value: item ? item.fuleLiterPrice : '',
      isReadOnly: true,
      isRequired: true,
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Total del la Factura",
      placeHolder: 'Total del la Factura',
      type: InputType.number,
      propertyName: 'invoiceTotal',
      value: item ? item.invoiceTotal : '',
      isReadOnly: true,
      isRequired: true,
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },    
    {
      name: 'Responsable',
      placeHolder: 'Responsable',
      type: InputType.select,
      propertyName: 'responsible',
      value: item ? item.responsible : false,
      isReadOnly: true,
      isRequired: true,
      source: this.users,
      sourceText: 'name',
      sourceValue: 'id',
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Tanqueta",
      placeHolder: 'Tanqueta',
      type: InputType.number,
      propertyName: 'tank',
      value: item ? item.tank : false,
      source: this.tanks,
      sourceText: 'machineId',      
      secondText: 'brand',
      sourceValue: 'id',
      isReadOnly: true,
      isRequired: true,
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Foto de Contador de Litros",
      placeHolder: 'Foto de Contador de Litros',
      type: InputType.file,
      propertyName: 'literCounterPicture',
      value: item ? item.literCounterPicture : '',
      isRequired: true,
      isReadOnly: false,
    },
    {
      name: "Ubicación",
      placeHolder: 'Ubicación',
      type: InputType.location,
      propertyName: 'gPSTag',
      value: item ? item.gPSTag : '',
      isReadOnly: true,
      isRequired: true,
    },
    {
      name: "Foto de la Factura",
      placeHolder: 'Foto de la Factura',
      type: InputType.file,
      propertyName: 'invoicePicture',
      value: item ? item.invoicePicture : '',
      isReadOnly: true,
      isRequired: true,
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "id",
      placeHolder: 'id',
      type: InputType.hidden,
      propertyName: 'id',
      value: item ? <number>item.id : '',
      isReadOnly: false
    },    
    ];

    this.loading = false;

    this.formItem.formItems = it;
    this.formItem.service = this.tankGasRefileService;
    this.formItem.formName = 'Carga Combustible a Tanqueta';
    this.formItem.hasSubmit = true;
    this.formItem.hasPrint = false;
    this.formItem.printSectionId = 'p-barcode';
    this.formItem.printStyleRef = '../../assets/print-barcode.css'
    this.formItem.printText = "Imprimir";
    this.formItem.submitText = "Guardar";
    this.formItem.submit = this.submitNew;
    this.formItem.alertComponent = this.alertComponent;
    this.formItem.router = this.router;
    this.formItem.returnType = new TankGasRefile();

    this.formItem.hasCancel = true;
    this.formItem.cancelText = "Cancelar";
    this.formItem.cancel = this.cancelNew;

    this.formItemReady = true;
  }

  onChangeMachine(){

    this.context.form.formItems.forEach(x=> {
      x.isReadOnly = false;
    })

    let machineid = this.context.formGroup.controls['refilingMaching'].value;

    var list = this.context.form.formItems.find(x=> x.propertyName == 'refilingMaching').source;
    this.context.form.formItems.find(x=> x.propertyName == 'tank').source = list.filter(x => x.id != machineid);

    let machine = list.find(x=> x.id == machineid);
    if(machine.useHorimeter){
      this.context.formGroup.controls['hourmeter'].disable();
    }else{
      this.context.formGroup.controls['mileage'].disable();
    }    
  }


  submitNew(result: TankGasRefile, service: TankGasRefilService) {
    this.loading = true;
    result.id = Number(result.id);
    if (result.id) {
      service.edit(result, result.id).subscribe(res => {
        this.alertComponent.text = 'Combustible Transferido exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['control/control-dashboard']);
        });
      });
    } else {
      service.new(result).subscribe(res => {
        this.alertComponent.text = 'Combustible Transferido exitosamente!';
        this.alertComponent.type = 'success';
        this.alertComponent.Show().then(res => {
          this.loading = false;
          this.router.navigate(['control/control-dashboard']);
        })
      })
    }
  }

  validateItemHour(control: FormItem) {

    let machineid = this.context.formGroup.controls['refilingMaching'].value;
    let machine = this.context.form.formItems.find(x => x.propertyName == 'refilingMaching').source.find(x => x.id == machineid);

    var diff = <number>this.context.formGroup.controls[control.propertyName].value - machine.currentHorimeter;
    if (diff > this.context.config.hourKmValueMargin) {
      this.context.alertComponent.type = 'warning';
      this.context.alertComponent.title = 'Advertencia'
      this.context.alertComponent.text = `El incremento en el horimetro es mayor al permitido por el sistema`;
      this.context.alertComponent.Show();
    }

  }

  validateItemOdometer(control: FormItem) {

    let machineid = this.context.formGroup.controls['refilingMaching'].value;
    let machine = this.context.form.formItems.find(x => x.propertyName == 'refilingMaching').source.find(x => x.id == machineid);

    var diff = <number>this.context.formGroup.controls[control.propertyName].value - machine.currentOdometer;
    if (diff > this.context.config.hourKmValueMargin) {
      this.context.alertComponent.type = 'warning';
      this.context.alertComponent.title = 'Advertencia'
      this.context.alertComponent.text = `El incremento en el kilometraje es mayor al permitido por el sistema`;
      this.context.alertComponent.Show();
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

export class TankOptions {
  isTank: boolean;
  name: string;
}