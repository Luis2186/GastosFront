import { subCategorieResult } from "./SubCategoriesResult";

export interface categorieResult {
    id: number,
    nombre: string,
    descripcion: string,
    subCategorias: subCategorieResult[]
}
