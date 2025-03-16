import { isAxiosError } from "axios";
import axiosInstance from "../../api/axiosConfig";
import { errorDefault } from "../../utils/utils";
import { Categorie } from "../../domain/types/Categorie";
import { CategorieResult, mapCategorieResultToCategorie, mapCategorieToCategorieResult } from "./types/CategoriesResult";
import { ICategoriesRepository } from "./interfaces/ICategoriesRepository";


const endpoint = "/categoria"


export const categoriesRepository: ICategoriesRepository = {
    async getAll(): Promise<Categorie[] | null> {
        try {
            const response = await axiosInstance.get(`${endpoint}/todas`);
            const result: CategorieResult[] = response.data;

            const categories: Categorie[] = result.map(mapCategorieResultToCategorie);

            return categories;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async getById(id: number): Promise<Categorie | null> {
        try {
            const response = await axiosInstance.get(`${endpoint}/obtener/${id}`);
            const result = response.data;
            // Verifica si la respuesta contiene un objeto 'categorie'
            const categorie: Categorie = {
                id: result.id,
                name: result.nombre,
                description: result.descripcion,
                subCategories: result.subCategorias
            };

            return categorie;

        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },
    update: async function (id: number | string, entity: Categorie): Promise<Categorie | null> {
        try {

            const catMapUpdate = mapCategorieToCategorieResult(entity);

            const response = await axiosInstance.put(`/usuario/actualizar/${id}`, catMapUpdate);
            const result = response.data;
            const categorie = mapCategorieResultToCategorie(result);

            return categorie;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
        throw new Error("Function not implemented.");
    },
    create: async function (entity: Categorie): Promise<Categorie | null> {
        throw new Error("Function not implemented.");
    },
    delete: async function (id: number | string): Promise<boolean> {
        throw new Error("Function not implemented.");
    }
}



