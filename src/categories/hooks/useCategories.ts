import { categoriesRepository } from "../api/categoriesApi";
import { useCategorieStore } from "../store/useCategorieStore"



export const useCategories = () => {
    const { onGetAll, onError, onLoading, onCreate, onRemove, onUpdate, setCurrentCategorie, clearCurrentCategorie } = useCategorieStore();

    const handleGetAllCategories = async () => {

        onLoading()

        const categories = await categoriesRepository.getAll();

        if (categories != null && categories.length > 0) {

            onGetAll(categories);
            return categories
        }

        return null
    }

    const handleGetCategorieById = async (id: number) => {
        onLoading()
        const categorie = await categoriesRepository.getById(id);

        if (categorie != null) {
            setCurrentCategorie(categorie);
            return categorie
        }

        return null
    }

    return {
        handleGetAllCategories,
        handleGetCategorieById,
    }
}