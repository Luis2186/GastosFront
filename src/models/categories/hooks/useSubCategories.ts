import { SubCategorie } from '../../../domain/types/SubCategorie'
import { errorMessage } from '../../../types/input'
import { isErrorMessage } from '../../../utils/typeGuards'
import { subCategoriesRepository } from '../api/subCategoriesApi'
import { useSubCategorieStore } from '../store/useSubCategorieStore'

export const useSubCategories = () => {

    const { onLoading, onGetAll, onCreate, onRemove, onUpdate, onError, setCurrentSubCategorie, clearCurrentSubCategorie } = useSubCategorieStore()

    const handleGetAllSubCategories = async (groupId: number, categorieId: number) => {

        if (!groupId || !categorieId) return

        onLoading()

        const subCategories: SubCategorie[] | errorMessage = await subCategoriesRepository.getAll(groupId, categorieId);

        if (subCategories && !isErrorMessage(subCategories)) {
            onGetAll(subCategories);
        }

        return subCategories;
    }


    return {
        handleGetAllSubCategories,
    }
}