import axiosInstance from "../../api/axiosConfig";
import { handleError } from "../../utils/utils";
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
            handleError(error);
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
            handleError(error);
        }
    },
    update: async function (id: number | string, entity: SubCategorie): Promise<SubCategorie | null> {
        try {
            const subCatResult = mapSubCategorieToSubCategorieResult(entity);

            const response = await axiosInstance.put(`/${endpoint}/actualizar/${id}`, subCatResult);
            const result: SubCategorieResult = response.data;

            const subCategorie = mapSubCategorieResultToSubCategorie(result);
            return subCategorie;
        } catch (error) {
            handleError(error);
        }
    },
    create: async function (entity: SubCategorie): Promise<SubCategorie | null> {
        try {
            const subCatResult = mapSubCategorieToSubCategorieResult(entity);

            const response = await axiosInstance.put(`/${endpoint}/crear`, subCatResult);
            const result: SubCategorieResult = response.data;
            const subCategorie = mapSubCategorieResultToSubCategorie(result);

            return subCategorie;
        } catch (error) {
            handleError(error);
        }
    },
    delete: async function (id: number | string): Promise<boolean> {
        try {
            const response = await axiosInstance.delete(`/${endpoint}/eliminar/${id}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }
}

