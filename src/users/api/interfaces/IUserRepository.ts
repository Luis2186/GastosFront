import { ICrudRepository } from "../../../domain/interfaces/ICrudRepository";
import { User, UserRegister } from "../../../domain/types/User";
import { LoginResult } from "../types/userResult";

export interface IUserRepository extends ICrudRepository<User> {
    register(user: UserRegister): Promise<User | null>;
    login(email: string, password: string): Promise<LoginResult>;
    logout(): void;
    refreshToken(refreshToken: string): void;
    getRolesbyUser(idUser: string): Promise<string[]>;
    getRoles(): Promise<string[]>;
    addRol(idUsuario: string, idRol: string, nombreRol: string): Promise<void>
    RemoveRol(idUsuario: string, idRol: string, nombreRol: string): Promise<void>
}