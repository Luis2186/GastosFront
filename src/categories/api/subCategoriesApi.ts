import { isAxiosError } from "axios";
import axiosInstance from "../../api/axiosConfig";
import { errorDefault } from "../../utils/utils";
import { subCategorieResult } from "./types/SubCategoriesResult";
import { SubCategorie } from "../../domain/types/SubCategorie";

const endpoint = "/subcategoria"

export const subCategoriesRepository = {

    async getAllSubCategories(groupId: number, categorieId: number): Promise<SubCategorie[] | null> {
        try {
            const response = await axiosInstance.get(`${endpoint}/todas/${groupId}/${categorieId}`)
            const result = response.data;

            const subCategories: SubCategorie[] = result.map((subCategorie: subCategorieResult) => {
                return {
                    id: subCategorie.id,
                    name: subCategorie.nombre,
                    description: subCategorie.descripcion,
                    categorieId: subCategorie.categoriaId,
                    groupId: subCategorie.groupId
                }
            });

            return subCategories;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async getSubCategorieById(id: number): Promise<SubCategorie | null> {
        try {
            const response = await axiosInstance.get(`${endpoint}/obtener/${id}`)
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

}


// -------------------------------------------------------------------------------


export const createSubCategorie = async (createdSubCategorie: subCategorieResult) => {
    try {
        const response = await axiosInstance.post(`${endpoint}/crear`, createdSubCategorie)

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw errorDefault(error.response ? error.response.data : error.message);
        }
        throw errorDefault();
    }
};

export const updateSubCategorie = async (id: number, updatedSubCategorie: subCategorieResult) => {
    try {
        const response = await axiosInstance.put(`${endpoint}/actualizar/${id}`, updatedSubCategorie)

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw errorDefault(error.response ? error.response.data : error.message);
        }
        throw errorDefault();
    }
};

export const deleteSubCategorie = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`${endpoint}/eliminar/${id}`)
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw errorDefault(error.response ? error.response.data : error.message);
        }
        throw errorDefault();
    }
};