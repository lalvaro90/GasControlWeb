export class ReportModel{
    colums:Array<ReportColum>;
    source:Array<any>;
    auxSource:Array<any>;
    filterSource:Array<any>;
    sourceValue:string;
    sourceText: string;
    hasPrint:boolean;
    hasSave:boolean;
    hasFilter: boolean;
    reportName:string;
    onFilterChange: Function;
}

export class ReportColum{
    color:string;
    name:string;
    fontSize:number;
    property:string;
    isObject:boolean;
    isDate:boolean;
    subProperty:string;
}
