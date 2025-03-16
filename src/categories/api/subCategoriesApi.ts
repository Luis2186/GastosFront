import { isAxiosError } from "axios";
import axiosInstance from "../../api/axiosConfig";
import { errorDefault } from "../../utils/utils";
import { mapSubCategorieResultToSubCategorie, mapSubCategorieToSubCategorieResult, SubCategorieResult } from "./types/SubCategoriesResult";
import { SubCategorie } from "../../domain/types/SubCategorie";
import { ISubCategoriesRepository } from "./interfaces/ISubCategoriesRepository";

const endpoint = "/subcategoria"

export const subCategoriesRepository: ISubCategoriesRepository = {
    async getAll(groupId: number, categorieId: number): Promise<SubCategorie[] | null> {
        try {
            const response = await axiosInstance.get(`${endpoint}/todas/${groupId}/${categorieId}`);
            const result: SubCategorieResult[] = response.data;

            const subCategories = result.map(mapSubCategorieResultToSubCategorie);

            return subCategories;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async getById(id: number): Promise<SubCategorie | null> {
        try {
            const response = await axiosInstance.get(`${endpoint}/obtener/${id}`);
            const result = response.data;

            const subCategories: SubCategorie = {
                id: result.id,
                name: result.nombre,
                description: result.descripcion,
                categorieId: result.categoriaId,
                groupId: result.groupId
            };

            return subCategories;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },
    update: async function (id: number | string, entity: SubCategorie): Promise<SubCategorie | null> {
        const subCatResult = mapSubCategorieToSubCategorieResult(entity);

        const response = await axiosInstance.put(`/${endpoint}/actualizar/${id}`, subCatResult);
        const result: SubCategorieResult = response.data;

        const subCategorie = mapSubCategorieResultToSubCategorie(result);
        return subCategorie;
    },
    create: async function (entity: SubCategorie): Promise<SubCategorie | null> {
        const subCatResult = mapSubCategorieToSubCategorieResult(entity);

        const response = await axiosInstance.put(`/${endpoint}/crear`, subCatResult);
        const result: SubCategorieResult = response.data;
        const subCategorie = mapSubCategorieResultToSubCategorie(result);

        return subCategorie;
    },
    delete: async function (id: number | string): Promise<boolean> {
        const response = await axiosInstance.delete(`/${endpoint}/eliminar/${id}`);
        return response.data;
    }
}

