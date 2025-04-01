import { ICrudRepository } from "../../../../domain/interfaces/ICrudRepository";
import { User, UserRegister } from "../../../../domain/types/User";
import { errorMessage } from "../../../../types/input";
import { LoginResult } from "../types/userResult";

export interface IUserRepository extends ICrudRepository<User> {
    register(user: UserRegister): Promise<User | errorMessage>;
    login(email: string, password: string): Promise<LoginResult | errorMessage>;
    logout(): void;
    refreshToken(refreshToken: string): void;
    getRolesbyUser(idUser: string): Promise<string[] | errorMessage>;
    getRoles(): Promise<string[] | errorMessage>;
    addRol(idUsuario: string, idRol: string, nombreRol: string): Promise<void>
    RemoveRol(idUsuario: string, idRol: string, nombreRol: string): Promise<void>
}