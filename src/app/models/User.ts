import { ItemStatus } from './ItemStatus';

export class User
    {
        id: number;
        email: string;
        password: string;
        token: string;
        createdDate: Date | string;
        lastLogin: Date | string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        mobileNumber: string;
        nationalId: string;
        picture: string;
        status: ItemStatus;
        permissions: string;
        isActive: boolean;
    }
