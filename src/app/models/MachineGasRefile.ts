import { ItemStatus } from './ItemStatus';
import { Machine } from './Machine';
import { Project } from './Project';
import { User } from './User';

export class MachineGasRefile
    {

        id: number;
        hourmeter: number;
        mileage: number;
        liters: number;
        currentPrice: number;
        refilingMaching: Machine;
        tank: Machine;
        tankConsecutive: number;
        transactionDate: Date | string;
        gPSTag: string;
        dispenser: User;
        receiver: User;
        project: Project;
        dispenserSignature: string;
        receiverSignature: string;

        status: ItemStatus;
    }
