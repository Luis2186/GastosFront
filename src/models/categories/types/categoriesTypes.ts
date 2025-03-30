import { Categorie } from "../../../domain/types/Categorie";
import { SubCategorie } from "../../../domain/types/SubCategorie";
import type { errorMessage } from "../../../types/input";

export interface categorieStore {
    categories: Categorie[]; // Lista de usuarios
    loading: boolean; // Indica si la tienda está en estado de carga
    errorMessage?: errorMessage; // Mensaje de error, opcional
    currentCategorie: Categorie | undefined

    // Métodos para manipular el estado
    onLoading: () => void;
    onGetAll: (categories: Categorie[], errorMessage?: errorMessage) => void;
    onCreate: (categorie: Categorie) => void;
    onRemove: (categorieId: number) => void;
    onUpdate: (categorieId: number, updatedCategorie: Partial<Categorie>) => void;
    onError: (error: errorMessage) => void;
    setCurrentCategorie: (currentCategorie: Categorie) => void;
    clearCurrentCategorie: () => void
}

export interface subCategorieStore {
    subCategories: SubCategorie[]; // Lista de usuarios
    loading: boolean; // Indica si la tienda está en estado de carga
    errorMessage?: errorMessage; // Mensaje de error, opcional
    currentSubCategorie: SubCategorie | undefined

    // Métodos para manipular el estado
    onLoading: () => void;
    onGetAll: (subCategories: SubCategorie[], errorMessage?: errorMessage) => void;
    onCreate: (subCategorie: SubCategorie) => void;
    onRemove: (subCategorieId: number) => void;
    onUpdate: (subCategorieId: number, updatedUser: Partial<SubCategorie>) => void;
    onError: (error: errorMessage) => void;
    setCurrentSubCategorie: (currentSubCategorie: SubCategorie) => void;
    clearCurrentSubCategorie: () => void
}

