import { ICrudRepository } from "../../../domain/interfaces/ICrudRepository";
import { Group } from "../../../domain/types/Group";


export interface IGroupRepository extends ICrudRepository<Group> {
    getAllByUser(idUser: string): Promise<Group[] | null>
}