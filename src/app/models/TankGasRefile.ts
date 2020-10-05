import { ItemStatus } from './ItemStatus';
import { Machine } from './Machine';
import { Provider } from './Provider';
import { User } from './User';

export class TankGasRefile
    {

        id: number;
        provider: Provider;
        gPSTag: string;
        litersCount: number;
        lnvoiceNumber: string;
        fuleLiterPrice: number;
        invoiceTotal: number;
        invoicePicture: string;
        literCounterPicture: string;
        responsible: User;
        tank: Machine;
        status: ItemStatus;
    }
