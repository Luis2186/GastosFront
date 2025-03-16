import { isAxiosError } from "axios";
import axiosInstance from "../../api/axiosConfig";
import { errorDefault } from "../../utils/utils";
import { Categorie } from "../../domain/types/Categorie";
import { categorieResult } from "./types/CategoriesResult";


const endpoint = "/categoria"


export const categoriesRepository = {

    async getAllCategories(): Promise<Categorie[] | null> {
        try {
            const response = await axiosInstance.get(`${endpoint}/todas`)

            const categories: Categorie[] = response.data.map((categorie: categorieResult) => {
                return {
                    id: categorie.id,
                    name: categorie.nombre,
                    description: categorie.descripcion,
                    subCategories: categorie.subCategorias
                }
            });

            return categories;
        } catch (error) {
            if (isAxiosError(error)) {
                throw errorDefault(error.response ? error.response.data : error.message);
            }
            throw errorDefault();
        }
    },

    async getCategorieById(id: number): Promise<Categorie | null> {
        try {
            const response = await axiosInstance.get(`${endpoint}/obtener/${id}`)
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
    }









}



