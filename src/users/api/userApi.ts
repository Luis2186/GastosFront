import { isAxiosError } from "axios";
import { errorDefault } from "../../utils/utils";
import axiosInstance from "../../api/axiosConfig";
import { User, UserRegister } from "../../domain/types/User";
import { LoginResult, mapUserRegisterToUserRegisterResult, mapUserResultToUser, mapUserToUserResult, UserResult } from "./types/userResult";
import { IUserRepository } from "./interfaces/IUserRepository";

export const userRepository: IUserRepository = {
    async register(user: UserRegister): Promise<User | null> {
        try {
            const userMap = mapUserRegisterToUserRegisterResult(user);

            if (userMap == null || userMap == undefined) return null;

            const response = await axiosInstance.post(`/usuario/registrar`, userMap);
            console.log(response);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async login(email: string, password: string): Promise<LoginResult> {
        try {

            const response = await axiosInstance.post('usuario/login', { email, password });

            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async logout() {
        try {
            const response = await axiosInstance.post('usuario/logout');

            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async refreshToken(refreshToken: string) {
        try {
            if (!refreshToken) return;
            const response = await axiosInstance.post('usuario/refresh-token', refreshToken);
            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    // Leer todos los usuarios
    async getAll(): Promise<User[]> {
        try {
            const response = await axiosInstance.get(`/usuario/paginados`);

            const result: UserResult[] = response.data;
            const usersMaps = result.map(mapUserResultToUser);

            return usersMaps;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async getById(id: string): Promise<User | null> {
        try {

            const response = await axiosInstance.get(`usuario/obtener/${id}`);
            const userResult: UserResult = response.data;
            const userMap = mapUserResultToUser(userResult);

            return userMap;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async update(idUser: string, updatedUser: User) {
        try {

            const userMapUpdate = mapUserToUserResult(updatedUser);

            const response = await axiosInstance.put(`/usuario/actualizar/${idUser}`, userMapUpdate);
            const result = response.data;
            const user = mapUserResultToUser(result);

            return user;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async delete(idUser: string) {
        try {
            const response = await axiosInstance.delete(`/usuario/eliminar/${idUser}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getRolesbyUser(idUser: string) {
        try {
            const response = await axiosInstance.get(`/usuario/obtenerRoles/${idUser}`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async getRoles() {
        try {
            const response = await axiosInstance.get(`/usuario/obtenerRoles`);

            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async addRol(idUsuario: string, idRol: string, nombreRol: string) {
        try {
            const agregarRolData = {
                idUsuario,
                idRol,
                nombreRol
            };

            console.log(agregarRolData);
            const response = await axiosInstance.post(`/usuario/agregarRol`, agregarRolData);
            return response.data;

        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },


    async RemoveRol(idUsuario: string, idRol: string, nombreRol: string) {
        try {
            if (!idUsuario || (!idRol && !nombreRol)) return;

            const response = await axiosInstance.delete(`/usuario/eliminarRol/${idUsuario}/${"idRol"}/${nombreRol}`);
            console.log(response);

            return response.data;

        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },
    create: function (entity: User): Promise<User | null> {
        throw new Error("Function not implemented.");
    }
}

