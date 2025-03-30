import { GroupResult } from "../../models/users/api/types/userResult";
import { Group } from "./Group";

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





