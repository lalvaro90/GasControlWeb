import { ItemImage } from './Image';
import { ItemStatus } from './ItemStatus';
import { User } from './User';

export class Project
    {
        id: number;
        name: string;
        details: string;
        location:string;
        responsible1: User;
        responsible2: User;
        pictures: ItemImage[];
        status: ItemStatus;

    }

export class ProjectConsumtionDto{
    id:number;
    name:string;
    consumption: number;
}
