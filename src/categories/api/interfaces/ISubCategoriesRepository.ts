import { ICrudRepository } from "../../../domain/interfaces/ICrudRepository";
import { SubCategorie } from "../../../domain/types/SubCategorie";

export interface ISubCategoriesRepository extends ICrudRepository<SubCategorie> {
    getAllById(groupId: number, categorieId: number): Promise<SubCategorie[] | null>;
}