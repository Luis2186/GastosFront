import { SubCategorie } from "../../../domain/types/SubCategorie";

export interface ISubCategoriesRepository {
    getAll(groupId: number, categorieId: number): Promise<SubCategorie[] | null>;
    getById(id: number | string): Promise<SubCategorie | null>,
    update(id: number | string, entity: SubCategorie): Promise<SubCategorie | null>,
    create(entity: SubCategorie): Promise<SubCategorie | null>,
    delete(id: number | string): Promise<boolean>,
}