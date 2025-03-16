import { Group } from "../../../domain/types/Group"
import { User } from "../../../domain/types/User";

export type GroupResult = {
    id: number,
    nombre: string,
    descripcion: string,
    fechaDeCreacion: Date,
    usuarioAdministradorId: string,
    codigoAcceso: string
    miembros: User[]
    activo: boolean
}

export interface createGroup {
    nombre: string;
    descripcion: string;
    usuarioAdministradorId: string;
    codigoAcceso: string;
    activo: boolean;
    codigo?: boolean;
}


export const mapGroupToSubGroupResult = (group: Group) => {
    return {
        id: group.id,
        nombre: group.name,
        descripcion: group.description,
        fechaDeCreacion: group.creationDate,
        usuarioAdministradorId: group.adminUserId,
        codigoAcceso: group.accessCode,
        active: group.active
    }
}

export const mapGroupResultToGroup = (group: GroupResult) => {
    return {
        id: group.id,
        name: group.nombre,
        description: group.descripcion,
        creationDate: group.fechaDeCreacion,
        adminUserId: group.usuarioAdministradorId,
        accessCode: group.codigoAcceso,
        active: group.activo
    }
}