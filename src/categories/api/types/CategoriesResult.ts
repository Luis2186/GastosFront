import { Categorie } from "../../../domain/types/Categorie";
import { mapSubCategorieResultToSubCategorie, mapSubCategorieToSubCategorieResult, SubCategorieResult } from "./SubCategoriesResult";

export interface CategorieResult {
    id: number,
    nombre: string,
    descripcion: string,
    subCategorias: SubCategorieResult[]
}

export const mapCategorieToCategorieResult = (categorie: Categorie) => {
    return {
        id: categorie.id,
        nombre: categorie.name,
        descripcion: categorie.description,
        subCategorias: categorie.subCategories.map(mapSubCategorieToSubCategorieResult)
    }
}

export const mapCategorieResultToCategorie = (categorie: CategorieResult) => {
    return {
        id: categorie.id,
        name: categorie.nombre,
        description: categorie.descripcion,
        subCategories: categorie.subCategorias.map(mapSubCategorieResultToSubCategorie)
    }
}