import { ItemImage } from './Image';
import { ItemStatus } from './ItemStatus';
import { Project } from './Project';
import { User } from './User';

export class Machine
    {
        id: number;
        machineId: string;
        description: string;
        brand: string;
        model: string;
        series: string;
        tankCapacity: number;
        currentCapacity: number;
        lastGasRefilePrice: number;
        lastRefilledLiters: number;
        location: Project;
        purchaseDate: Date | string;
        responsible1: User;
        responsible2: User;
        responsible3: User;
        images: ItemImage[];
        isTank: boolean;
        useHorimeter: boolean;
        currentHorimeter: number;
        currentOdometer: number;

        //Admin Properties
        status: ItemStatus;
        lastUpdated: Date | string;
    }

    export class MachineConsumptionDto{
        machineId:string;
        brand: string;
        average: number;
        isTank: boolean;
        usesHorimeter: boolean
        currentCapacity: number;
        tankCapacity: number;
    }
