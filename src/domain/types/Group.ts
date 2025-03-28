import { User } from "./User";

export interface Group {
    id: number;
    name: string;
    description: string;
    creationDate?: Date;
    adminUserId: string;
    members?: User[];
    active?: boolean;
    accessCode?: string
}