import { ItemStatus } from './ItemStatus';

export class Configuration
{
    id: number;
    companyCode: string;
    currency: string;
    companyLogo: string;
    companyName: string;
    phoneNumber: string;
    cEOName: string;
    supervisor: string;
    status: ItemStatus;
    hourKmValueMargin:number;
    tankWarningLevel:number;
    tankCritialLevel:number;
    tankOkLevel:number;
}
