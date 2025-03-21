import { subCategoriesRepository } from '../api/subCategoriesApi'
import { useSubCategorieStore } from '../store/useSubCategorieStore'

export const useSubCategories = () => {

    const { onLoading, onGetAll, onCreate, onRemove, onUpdate, onError, setCurrentSubCategorie, clearCurrentSubCategorie } = useSubCategorieStore()

    const handleGetAllSubCategories = async (groupId: number, categorieId: number) => {

        if (!groupId || !categorieId) return

        onLoading()

        const subCategories = await subCategoriesRepository.getAll(groupId, categorieId);

        if (subCategories != null) {
            onGetAll(subCategories);
        }

        return subCategories;
    }


    return {
        handleGetAllSubCategories,
    }
}