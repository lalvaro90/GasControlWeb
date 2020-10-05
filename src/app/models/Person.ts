import { ItemStatus } from './ItemStatus';
import { Machine } from './Machine';
import { User } from './User';

export class TankDayliReport
    {
        id: number;
        tank: Machine;
        dispatchedLiters: number;
        loadedLiters: number;
        litersLeft: number;
        literCounter: number;
        responsible: User;
        reportDate: Date | string;
        status: ItemStatus;
    }
