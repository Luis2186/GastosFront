import { create } from 'zustand'
import type { categorieStore, categorieResult } from '../types/categoriesTypes';

export const useCategorieStore = create<categorieStore>((set) => ({
    categories: [],
    loading: false,
    errorMessage: undefined,
    currentCategorie: undefined,

    onLoading: () => {
        set((state) => ({ ...state, loading: true }))
    },
    onGetAll: (categories, errorMessage) => {
        set((state) => ({ categories, loading: false, errorMessage }))
    },
    onCreate: (categorie) => {
        set((state) => ({ ...state, loading: false, categories: [...state.categories, categorie] }))
    },
    onRemove: (categorieId) => {
        set((state) =>
        ({
            loading: false,
            categories: state.categories.filter(categorie => categorie.id !== categorieId)
        })
        )
    },
    onUpdate: (categorieId, updateCategorie) => {
        set((state) => ({
            loading: false,
            categories: state.categories.map((categorie) =>
                categorie.id === categorieId ? { ...categorie, ...updateCategorie } : categorie
            ),
        }))
    },
    onError: (errorMessage) => {
        set((state) => ({ ...state, errorMessage }))
    },
    setCurrentCategorie: (currentCategorie: categorieResult) => {
        set((state) => ({ ...state, loading: false, currentCategorie }))
    },
    clearCurrentCategorie: () => {
        set((state) => ({ ...state, currentCategorie: undefined }))
    }
}))