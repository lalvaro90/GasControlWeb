import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomaticBuildFormsComponent } from 'src/app/forms/build-forms/build-forms.component';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { Configuration } from 'src/app/models/Configuration';
import { FormBuilder, FormItem, InputType } from 'src/app/models/FormItem';
import { Machine } from 'src/app/models/Machine';
import { MachineGasRefile } from 'src/app/models/MachineGasRefile';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { ConfigService } from 'src/app/Services/config.service';
import { MachineGasRefileService } from 'src/app/Services/machine-gas-refile.service';
import { MachineService } from 'src/app/Services/machine.service';
import { ProjectsService } from 'src/app/Services/projects.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-new-gas-transfer',
  templateUrl: './new-gas-transfer.component.html',
  styleUrls: ['./new-gas-transfer.component.css']
})
export class NewGasTransferComponent implements OnInit {
  formItem = new FormBuilder;
  alertComponent: AlertItem;
  formItemReady = false;
  gasTransfer: MachineGasRefile;
  config: Configuration;
  loading = false;
  users: Array<User>;
  projects: Array<Project>;
  machines: Array<Machine>;
  tanks: Array<Machine>;
  equipment: Array<Machine>;
  context:AutomaticBuildFormsComponent;
  isTank: Array<TankOptions> = [{ isTank: false, name: 'No' }, { isTank: true, name: 'Si' }];

  constructor(
    private machineService: MachineService,
    private configService: ConfigService,
    private userService: UserService,
    private projectService: ProjectsService,
    private machineRefileService: MachineGasRefileService,
    public router: Router,
    private route: ActivatedRoute) {
    this.alertComponent = new AlertItem();
    this.machines = new Array<Machine>();
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
      this.machines = res;
      this.equipment = this.machines.filter(x => x.isTank == false);
      this.tanks = this.machines.filter(x => x.isTank == true);
    });

    this.route.queryParams.subscribe(async params => {
      let id = params['id'];
      if (id) {
        await this.machineRefileService.getById(id).toPromise().then(res => {
          this.gasTransfer = res;
          this.setupForm(this.gasTransfer);
        });
      } else {
        this.setupForm();
      }
    });
  }

  private setupForm(item: MachineGasRefile = null) {
    this.formItem = new FormBuilder();
    this.formItem.formItems = new Array<FormItem>();
    let it = <Array<FormItem>>[{
      name: "Equipo al que se le dispensa",
      placeHolder: 'Equipo',
      type: InputType.select,
      propertyName: 'refilingMaching',
      value: item ? item.refilingMaching : '',
      isReadOnly: false,
      isRequired: true,
      sourceText: 'description',
      secondText: 'machineId',
      sourceValue: 'id',
      source: this.equipment,
      selectOnChange: this.onChangeMachine
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Cisterna o Tanqueta",
      placeHolder: 'Cisterna o Tanqueta',
      type: InputType.select,
      propertyName: 'tank',
      value: item ? item.tank : '',
      isReadOnly: true,
      isRequired: true,
      sourceText: 'description',
      secondText: 'machineId',
      sourceValue: 'id',
      source: this.tanks
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Horimetro",
      placeHolder: 'Horimetro actual',
      type: InputType.number,
      propertyName: 'hourmeter',
      value: item ? item.hourmeter : '',
      isReadOnly: true,
      isRequired: true,
    },
    {
      name: "Kilometraje Actual",
      placeHolder: 'Kilometraje Actual',
      type: InputType.number,
      propertyName: 'mileage',
      value: item ? item.mileage : '',
      isReadOnly: true,
      isRequired: true,
    },
    {
      name: "Catidad de litros dispensados",
      placeHolder: 'Catidad de listros dispensados',
      type: InputType.number,
      propertyName: 'liters',
      value: item ? item.liters : '',
      isRequired: true,
      isReadOnly: false,
    },
    {
      name: "Precio Actual del Combustible",
      placeHolder: 'Precio Actual del Combustible',
      type: InputType.number,
      propertyName: 'currentPrice',
      value: item ? item.currentPrice : '',
      isReadOnly: true,
      isRequired: true,
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Consecutivo Maria",
      placeHolder: 'Consecutivo Maria',
      type: InputType.number,
      propertyName: 'tankConsecutive',
      value: item ? item.tankConsecutive : '',
      isReadOnly: true,
      isRequired: true,
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Fecha",
      placeHolder: 'Fecha',
      type: InputType.date,
      propertyName: 'transactionDate',
      value: item ? item.transactionDate : '',
      isReadOnly: true,
      isRequired: true,
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Quien Dispensa",
      placeHolder: 'Quien Dispensa',
      type: InputType.select,
      propertyName: 'dispenser',
      value: item ? item.dispenser : false,
      isReadOnly: true,
      isRequired: true,
      source: this.users,
      sourceText: 'firstName',
      secondText: 'lastName',
      sourceValue: 'id',
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Quien Recibe",
      placeHolder: 'Quien Recibe',
      type: InputType.select,
      propertyName: 'receiver',
      value: item ? item.receiver : false,
      isReadOnly: true,
      isRequired: true,
      source: this.users,
      sourceText: 'firstName',
      secondText: 'lastName',
      sourceValue: 'id',
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Conteo de la maria",
      placeHolder: 'Conteo de la maria',
      type: InputType.number,
      propertyName: 'LitersCount',
      value: item ? item.LitersCount : false,
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
    {
      name: "Foto del Contador",
      placeHolder: 'Foto del Contador',
      type: InputType.file,
      propertyName: 'LiterCounterPicture',
      value: item ? item.LiterCounterPicture : false,
      isReadOnly: true,
      isRequired: true,
      // textMask:  [/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: "Firma de quien recibe",
      placeHolder: 'Firma de quien recibe',
      type: InputType.signature,
      propertyName: 'receiverSignature',
      value: item ? item.receiverSignature : '',
      isReadOnly: true
    },
    ];

    this.loading = false;

    this.formItem.formItems = it;
    this.formItem.service = this.machineRefileService;
    this.formItem.formName = 'Transferir Combustible a Equipo';
    this.formItem.hasSubmit = true;
    this.formItem.hasPrint = false;
    this.formItem.printSectionId = 'p-barcode';
    this.formItem.printStyleRef = '../../assets/print-barcode.css'
    this.formItem.printText = "Imprimir";
    this.formItem.submitText = "Guardar";
    this.formItem.submit = this.submitNew;
    this.formItem.alertComponent = this.alertComponent;
    this.formItem.router = this.router;
    this.formItem.returnType = new MachineGasRefile();

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
    let machine = this.context.form.formItems.find(x=> x.propertyName == 'refilingMaching').source.find(x=> x.id == machineid);
    if(machine.useHorimeter){
      this.context.formGroup.controls['hourmeter'].disable();
    }else{
      this.context.formGroup.controls['mileage'].disable();
    }    
  }


  submitNew(result: MachineGasRefile, service: MachineGasRefileService) {
    this.loading = true;
    debugger;
    result.id = Number(result.id);
    if (result.id) {
      service.edit(result, result.id).subscribe(res => {
        this.alertComponent.text = 'Maquina modificada exitosamente!';
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

export class TankOptions {
  isTank: boolean;
  name: string;
}