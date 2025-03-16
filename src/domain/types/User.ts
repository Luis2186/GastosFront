import { GroupResult } from "../../users/api/types/userResult";

export type User = {
    id: string,
    userName: string,
    name: string,
    lastName: string,
    age: number,
    email: string,
    phone: string,
    dateOfBirth: Date,
    registrationDate: Date,
    roles: string[],
    active: boolean,
    expenseGroup?: Group[] | undefined
}

export type UserRegister = {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    dateOfBirth: Date,
    password: string,
    passwordConfirmation: string,
    createGroup: boolean,
    role: string,
    group?: GroupResult | null,
    token?: string
}

export interface Group {
    id: number;
    name: string;
    description: string;
    creationDate: Date;
    adminUserId: string;
    members?: User[];
    active: boolean;
}

interface UserStoreState {
    users: User[]; // Array de objetos tipo User
    loading: boolean;
    errorMessage?: string;

    // Métodos para manipular el estado
    onLoading: () => void;
}

