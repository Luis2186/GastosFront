import axiosInstance from "../../../api/axiosConfig";
import { handleError } from "../../../utils/utils";
import { mapSubCategorieResultToSubCategorie, mapSubCategorieToSubCategorieResult, SubCategorieResult } from "./types/SubCategoriesResult";
import { SubCategorie } from "../../../domain/types/SubCategorie";
import { ISubCategoriesRepository } from "./interfaces/ISubCategoriesRepository";
import { errorMessage } from "../../../types/input";

const endpoint = "/subcategoria"

export const subCategoriesRepository: ISubCategoriesRepository = {
    async getAll(groupId: number, categorieId: number): Promise<SubCategorie[] | errorMessage> {
        try {
            const response = await axiosInstance.get(`${endpoint}/todas/${groupId}/${categorieId}`);
            const result: SubCategorieResult[] = response.data;

            const subCategories = result.map(mapSubCategorieResultToSubCategorie);

            return subCategories;
        } catch (error) {
            return handleError(error);
        }
    },

    async getById(id: number): Promise<SubCategorie | errorMessage> {
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
            return handleError(error);
        }
    },
    update: async function (id: number | string, entity: SubCategorie): Promise<SubCategorie | errorMessage> {
        try {
            const subCatResult = mapSubCategorieToSubCategorieResult(entity);
            console.log(subCatResult)
            const response = await axiosInstance.put(`${endpoint}/actualizar/${id}`, subCatResult);
            const result: SubCategorieResult = response.data;

            const subCategorie = mapSubCategorieResultToSubCategorie(result);
            return subCategorie;
        } catch (error) {
            return handleError(error);
        }
    },
    create: async function (entity: SubCategorie): Promise<SubCategorie | errorMessage> {
        try {
            const subCatResult = mapSubCategorieToSubCategorieResult(entity);

            console.log(subCatResult)
            const response = await axiosInstance.post(`${endpoint}/crear`, subCatResult);
            const result: SubCategorieResult = response.data;
            const subCategorie = mapSubCategorieResultToSubCategorie(result);

            return subCategorie;
        } catch (error) {
            return handleError(error);
        }
    },
    delete: async function (id: number | string): Promise<boolean | errorMessage> {
        try {
            const response = await axiosInstance.delete(`${endpoint}/eliminar/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    }
}

