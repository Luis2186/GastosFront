import { Categorie } from "../../../domain/types/Categorie";
import { errorMessage } from "../../../types/input";
import { isErrorMessage } from "../../../utils/typeGuards";
import { categoriesRepository } from "../api/categoriesApi";
import { useCategorieStore } from "../store/useCategorieStore"



export const useCategories = () => {
    const { onGetAll, onError, onLoading, onCreate, onRemove, onUpdate, setCurrentCategorie, clearCurrentCategorie } = useCategorieStore();

    const handleGetAllCategories = async () => {

        onLoading()

        const categories: Categorie[] | errorMessage = await categoriesRepository.getAll();

        if (!isErrorMessage(categories) && categories && categories.length > 0) {

            onGetAll(categories);
            return categories
        }

        if (isErrorMessage(categories)) onError(categories)

        return categories
    }

    const handleGetCategorieById = async (id: number) => {

        onLoading()

        const categorie: Categorie | errorMessage = await categoriesRepository.getById(id);

        if (!isErrorMessage(categorie) && categorie) {
            setCurrentCategorie(categorie);
            return categorie
        }

        if (isErrorMessage(categorie)) onError(categorie)

        return categorie
    }

    return {
        handleGetAllCategories,
        handleGetCategorieById,
    }
}