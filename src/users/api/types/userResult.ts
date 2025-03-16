import { Group, User, UserRegister } from "../../../domain/types/User";

export interface GroupResult {
    id: number;
    nombre: string;
    descripcion: string;
    fechaDeCreacion: Date;
    usuarioAdministradorId: string;
    miembros?: UserResult[];
    activo: boolean;
}

export interface UserResult {
    id: string;
    nombreDeUsuario: string;
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
    telefono: string;
    fechaDeNacimiento: Date;
    fechaDeRegistro: Date;
    roles: string[];
    activo: boolean;
    grupoDeGastos?: GroupResult[] | null;
}

export interface UserRegisterResult {
    nombreDeUsuario: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    fechaDeNacimiento: Date;
    password: string;
    confirmacionPassword: string;
    rol: string;
    crearGrupo: boolean;
    grupo?: GrupoResult | null;
    token?: string;
}

export interface GrupoResult {
    nombre: string;
    descripcion: string;
    codigoAcceso: string;
}


export interface LoginResult {
    mensaje: string;
    id: string;
}

export const mapUserRegisterToUserRegisterResult = (user: UserRegister): UserRegisterResult => {
    return {
        nombreDeUsuario: user.userName,
        nombre: user.firstName,
        apellido: user.lastName,
        email: user.email,
        telefono: user.phone,
        fechaDeNacimiento: user.dateOfBirth,
        password: user.password,
        confirmacionPassword: user.passwordConfirmation,
        rol: user.role,
        crearGrupo: false,
        grupo: null,
    }
}

export const mapUserRegisterResultToUserRegister = (user: UserRegisterResult): UserRegister => {
    return {
        userName: user.nombreDeUsuario,
        firstName: user.nombre,
        lastName: user.apellido,
        email: user.email,
        phone: user.telefono,
        dateOfBirth: user.fechaDeNacimiento,
        password: user.password,
        passwordConfirmation: user.confirmacionPassword,
        role: user.rol,
        createGroup: false,
        group: null,
    }
}

export const mapGroupToGroupResult = (group: Group): GroupResult => {
    return {
        id: group.id,
        nombre: group.name,
        descripcion: group.description,
        fechaDeCreacion: group.creationDate,
        usuarioAdministradorId: group.adminUserId,
        miembros: group.members?.map(mapUserToUserResult),
        activo: group.active
    }
}

export const mapGroupResultToGroup = (group: GroupResult): Group => {
    return {
        id: group.id,
        name: group.nombre,
        description: group.descripcion,
        creationDate: group.fechaDeCreacion,
        adminUserId: group.usuarioAdministradorId,
        members: group.miembros?.map(mapUserResultToUser),
        active: group.activo
    }
}

export const mapUserResultToUser = (user: UserResult): User => {
    return {
        id: user.id,
        userName: user.nombreDeUsuario,
        name: user.nombre,
        lastName: user.apellido,
        age: user.edad,
        email: user.email,
        phone: user.telefono,
        dateOfBirth: user.fechaDeNacimiento,
        registrationDate: user.fechaDeRegistro,
        roles: user.roles,
        active: user.activo,
        expenseGroup: user.grupoDeGastos?.map(mapGroupResultToGroup)
    }
}

export const mapUserToUserResult = (user: User) => {
    return {
        id: user.id,
        nombreDeUsuario: user.userName,
        nombre: user.name,
        apellido: user.lastName,
        edad: user.age,
        email: user.email,
        telefono: user.phone,
        fechaDeNacimiento: user.dateOfBirth,
        fechaDeRegistro: user.registrationDate,
        roles: user.roles,
        activo: user.active,
        grupoDeGastos: user.expenseGroup?.map(group => mapGroupToGroupResult(group))
    }
}