import { SubCategorie } from "../../../../domain/types/SubCategorie";
import { errorMessage } from "../../../../types/input";

export interface ISubCategoriesRepository {
    getAll(groupId: number, categorieId: number): Promise<SubCategorie[] | errorMessage>;
    getById(id: number | string): Promise<SubCategorie | errorMessage>,
    update(id: number | string, entity: SubCategorie): Promise<SubCategorie | errorMessage>,
    create(entity: SubCategorie): Promise<SubCategorie | errorMessage>,
    delete(id: number | string): Promise<boolean | errorMessage>,
}