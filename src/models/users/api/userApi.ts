import { createErrorObject, handleError } from "../../../utils/utils";
import axiosInstance from "../../../api/axiosConfig";
import { User, UserRegister } from "../../../domain/types/User";
import { LoginResult, mapUserRegisterToUserRegisterResult, mapUserResultToUser, mapUserToUserResult, UserResult } from "./types/userResult";
import { IUserRepository } from "./interfaces/IUserRepository";
import { errorMessage } from "../../../types/input";
import { isErrorMessage } from "../../../utils/typeGuards";

export const userRepository: IUserRepository = {
    async register(user: UserRegister): Promise<User | errorMessage> {
        try {
            const userMap = mapUserRegisterToUserRegisterResult(user);

            if (userMap == null || userMap == undefined) return createErrorObject(400, "Error al mapear el usuario");

            const response = await axiosInstance.post(`/usuario/registrar`, userMap);

            return response.data;
        } catch (error) {
            return handleError(error);
        }
    },

    async login(email: string, password: string): Promise<LoginResult | errorMessage> {
        try {

            const responseAxios = await axiosInstance.post('usuario/login', { email, password });

            const response: LoginResult | errorMessage = responseAxios.data;

            if (isErrorMessage(response)) return response;

            return response;
        } catch (error) {
            return handleError(error);
        }
    },

    async logout() {
        try {
            const response = await axiosInstance.post('usuario/logout');

            return response;
        } catch (error) {
            handleError(error);
        }
    },

    async refreshToken(refreshToken: string) {
        try {
            if (!refreshToken) return;
            const response = await axiosInstance.post('usuario/refresh-token', refreshToken);
            return response;
        } catch (error) {
            handleError(error);
        }
    },

    // Leer todos los usuarios
    async getAll(): Promise<User[] | errorMessage> {
        try {
            const response = await axiosInstance.get(`/usuario/paginados`);

            const result: UserResult[] = response.data;
            const usersMaps = result.map(mapUserResultToUser);

            return usersMaps;
        } catch (error) {
            return handleError(error);
        }
    },

    async getById(id: string): Promise<User | errorMessage> {
        try {

            const response = await axiosInstance.get(`usuario/obtener/${id}`);
            const userResult: UserResult = response.data;

            const userMap = mapUserResultToUser(userResult);

            return userMap;
        } catch (error) {
            return handleError(error);
        }
    },

    async update(idUser: string, updatedUser: User): Promise<User | errorMessage> {
        try {

            const userMapUpdate = mapUserToUserResult(updatedUser);

            const response = await axiosInstance.put(`/usuario/actualizar/${idUser}`, userMapUpdate);
            const result = response.data;
            const user = mapUserResultToUser(result);

            return user;
        } catch (error) {
            return handleError(error);
        }
    },

    async delete(idUser: string) {
        try {
            const response = await axiosInstance.delete(`/usuario/eliminar/${idUser}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    async getRolesbyUser(idUser: string) {
        try {
            const response = await axiosInstance.get(`/usuario/obtenerRoles/${idUser}`);

            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    async getRoles() {
        try {
            const response = await axiosInstance.get(`/usuario/obtenerRoles`);

            return response.data;
        } catch (error) {
            handleError(error);
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
            handleError(error);
        }
    },


    async RemoveRol(idUsuario: string, idRol: string, nombreRol: string) {
        try {
            if (!idUsuario || (!idRol && !nombreRol)) return;

            const response = await axiosInstance.delete(`/usuario/eliminarRol/${idUsuario}/${idRol}/${nombreRol}`);
            console.log(response);

            return response.data;

        } catch (error) {
            return handleError(error);
        }
    },
    create: function (entity: User): Promise<User | errorMessage> {
        throw new Error("Function not implemented.");
    }
}

