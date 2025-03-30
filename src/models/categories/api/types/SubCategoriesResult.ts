import { SubCategorie } from "../../../../domain/types/SubCategorie"

export interface SubCategorieResult {
    id: number,
    nombre: string,
    descripcion: string,
    categoriaId: number,
    grupoId: number
}

export const mapSubCategorieToSubCategorieResult = (categorie: SubCategorie) => {
    return {
        id: categorie.id,
        nombre: categorie.name,
        descripcion: categorie.description,
        categoriaId: categorie.categorieId,
        grupoId: categorie.groupId
    }
}

export const mapSubCategorieResultToSubCategorie = (categorie: SubCategorieResult) => {
    return {
        id: categorie.id,
        name: categorie.nombre,
        description: categorie.descripcion,
        categorieId: categorie.categoriaId,
        groupId: categorie.grupoId
    }
}