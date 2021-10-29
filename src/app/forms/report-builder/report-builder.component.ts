import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { config } from 'rxjs';
import { Configuration } from 'src/app/models/Configuration';
import { ConfigService } from 'src/app/Services/config.service';
import { ReportModel } from '../report.model';

@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.css']
})
export class ReportBuilderComponent implements OnInit {

  styleUrlRef = '../../assets/print.css';
  printId="printDiv";

  config:Configuration = new Configuration();

  constructor(private configService:ConfigService) {
   }
   
  @Input() reportModel:ReportModel = new ReportModel();
  source:Array<any>;

  ngOnInit(): void {
  }

  ngAfterViewInit(){       
    this.configService.getConfiguration().subscribe(res => this.config = res);
  }

  sortData(sort: Sort) {
    const data = this.reportModel.source.slice();
    
    if (!sort.active || sort.direction === '') {
      this.reportModel.source = data;
      return;
    }

    this.reportModel.source = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
  }
  
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
