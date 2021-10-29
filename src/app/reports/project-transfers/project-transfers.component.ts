import { Component, OnInit } from '@angular/core';
import { ReportModel } from 'src/app/forms/report.model';
import { Project } from 'src/app/models/Project';
import { MachineGasRefileService } from 'src/app/Services/machine-gas-refile.service';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-project-transfers',
  templateUrl: './project-transfers.component.html',
  styleUrls: ['./project-transfers.component.css']
})
export class ProjectTransfersComponent implements OnInit {

  model:ReportModel;
  projects: Array<Project>
  context:any;

  constructor(private machineGasRefileService: MachineGasRefileService, private projectService: ProjectsService) {
  }

  async initReportData(){
    await this.projectService.get().toPromise().then(res => this.projects = res); 
    this.model = new ReportModel();
    await this.machineGasRefileService.get().toPromise().then(res => {
      this.model.source = res;
      this.model.filterSource = this.projects;
      this.model.sourceText = 'name';
      this.model.sourceValue = 'id';
      this.model.colums = [
        {color:'',fontSize:12,name:'Proyecto',property:'project',isObject:true, subProperty: 'name', isDate:false },
        {color:'',fontSize:12,name:'Tanqueta',property:'tank',isObject:true, subProperty: 'machineId', isDate:false },
        {color:'',fontSize:12,name:'Cantidad de Litros',property:'liters',isObject:false, subProperty: '', isDate:false },
        {color:'',fontSize:12,name:'Consecutivo de Tanqueta',property:'tankConsecutive',isObject:false, subProperty: '', isDate:false },
        {color:'',fontSize:12,name:'Kilometraje',property:'mileage',isObject:false, subProperty: '', isDate:false },
        {color:'',fontSize:12,name:'Horimetro',property:'hourmeter',isObject:false, subProperty: '', isDate:false },
        {color:'',fontSize:12,name:'Maquina',property:'refilingMaching',isObject:true, subProperty: 'machineId', isDate:false },
        {color:'',fontSize:12,name:'Fecha',property:'transactionDate',isObject:false, subProperty: '', isDate:true },
      ];
      this.model.reportName = 'Transferencias Por Proyecto';
      this.model.hasPrint = true;
      this.model.hasSave = true;
      this.model.hasFilter = true;
      this.model.onFilterChange = (context:ReportModel, $event)=>{
        if(!context.auxSource)
          context.auxSource = context.source;

        const values = context.auxSource.filter(x => x.project.id == $event.target.value);
        context.source = $event.target.value > 0? values : context.auxSource;

        console.log('event', values);
      }
    })
  }

  ngOnInit(): void {
    this.initReportData();
  }



}
