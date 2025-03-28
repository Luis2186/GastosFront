import { ICrudRepository } from "../../../domain/interfaces/ICrudRepository";
import { Group } from "../../../domain/types/Group";
import { JoinGroup } from "../types/GroupResult";


export interface IGroupRepository extends ICrudRepository<Group> {
    getAllByUser(idUser: string): Promise<Group[] | null>,
    joinGroup(joinGroup: JoinGroup): Promise<boolean | null>
}