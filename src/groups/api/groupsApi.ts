import { isAxiosError } from "axios";
import axiosInstance from "../../api/axiosConfig";
import { IGroupRepository } from "./interfaces/IGroupRepository";
import { GroupResult, mapGroupResultToGroup } from "./types/GroupResult";
import { errorDefault } from "../../utils/utils";
import { Group } from "../../domain/types/Group";
import { mapGroupToGroupResult } from "../../users/api/types/userResult";

const endpoint = 'grupo'

const groupRepository: IGroupRepository = {
    getAll: async function (): Promise<Group[] | null> {
        try {
            const response = await axiosInstance.get(`${endpoint}/todas`);
            const result: GroupResult[] = response.data;

            const groups: Group[] = result.map(mapGroupResultToGroup);

            return groups;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },
    getById: async function (id: number | string): Promise<Group | null> {
        try {
            const response = await axiosInstance.get(`${endpoint}/obtener/${id}`);
            const result: GroupResult = response.data;

            const group: Group = mapGroupResultToGroup(result);

            return group;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },
    update: async function (id: number | string, entity: Group): Promise<Group | null> {
        try {
            const groupResult = mapGroupToGroupResult(entity);

            const response = await axiosInstance.put(`/${endpoint}/actualizar/${id}`, groupResult);
            const result: GroupResult = response.data;

            const group = mapGroupResultToGroup(result);
            return group;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },
    create: async function (entity: Group): Promise<Group | null> {
        try {
            const groupResult = mapGroupToGroupResult(entity);

            const response = await axiosInstance.put(`/${endpoint}/crear`, groupResult);
            const result: GroupResult = response.data;

            const group = mapGroupResultToGroup(result);
            return group;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },
    delete: async function (id: number | string): Promise<boolean> {
        try {
            const response = await axiosInstance.delete(`/${endpoint}/eliminar/${id}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    }
}