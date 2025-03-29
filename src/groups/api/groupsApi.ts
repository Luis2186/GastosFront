import axiosInstance from "../../api/axiosConfig";
import { IGroupRepository } from "./interfaces/IGroupRepository";
import { GroupResult, JoinGroup, mapGroupResultToGroup, mapJoinGroupToJoinGroupResult } from "./types/GroupResult";
import { Group } from "../../domain/types/Group";
import { mapGroupToGroupResult } from "../../users/api/types/userResult";
import { createErrorObject, handleError } from "../../utils/utils";
import { errorMessage } from "../../types/input";

const endpoint = 'grupo'

export const groupRepository: IGroupRepository = {
    getAll: async function (): Promise<Group[] | errorMessage> {
        try {
            const response = await axiosInstance.get(`${endpoint}/todas`);
            const result: GroupResult[] = response.data;

            const groups: Group[] = result.map(mapGroupResultToGroup);

            return groups ?? createErrorObject(response.status);
        } catch (error) {
            return handleError(error);
        }
    },
    getById: async function (id: number | string): Promise<Group | errorMessage> {
        try {
            const response = await axiosInstance.get(`${endpoint}/obtener/${id}`);
            const result: GroupResult = response.data;

            const group: Group = mapGroupResultToGroup(result);

            return group;
        } catch (error) {
            return handleError(error);
        }
    },
    update: async function (id: number | string, entity: Group): Promise<Group | errorMessage> {
        try {
            const groupResult = mapGroupToGroupResult(entity);

            const response = await axiosInstance.put(`/${endpoint}/actualizar/${id}`, groupResult);
            const result: GroupResult = response.data;

            const group = mapGroupResultToGroup(result);
            return group;
        } catch (error) {
            return handleError(error);
        }
    },
    create: async function (entity: Group): Promise<Group | errorMessage> {
        try {

            const groupResult = mapGroupToGroupResult(entity);
            const response = await axiosInstance.post(`/${endpoint}/crear`, groupResult);
            const result: GroupResult = response.data;

            const group = mapGroupResultToGroup(result);
            if (group) return group;

            return createErrorObject()
        } catch (error) {
            return handleError(error);
        }
    },
    delete: async function (id: number | string): Promise<boolean> {
        try {
            const response = await axiosInstance.delete(`/${endpoint}/eliminar/${id}`);

            // Si la respuesta contiene datos, devolvemos true. Caso contrario, false.
            return response.data != null;
        } catch (error) {
            throw handleError(error);
        }
    },
    getAllByUser: async function (idUser: string): Promise<Group[] | errorMessage> {
        try {
            const response = await axiosInstance.get(`${endpoint}/todas/${idUser}`);
            const result: GroupResult[] = response.data;

            const groups: Group[] = result.map(mapGroupResultToGroup);

            return groups;
        } catch (error) {
            return handleError(error);
        }
    },
    joinGroup: async function (joinGroup: JoinGroup): Promise<boolean | errorMessage> {
        try {
            const joinGroupResult = mapJoinGroupToJoinGroupResult(joinGroup);
            const response = await axiosInstance.post(`solicitud/porCodigo`, joinGroupResult);

            return response != null;
        } catch (error) {
            return handleError(error);
        }
    }
}