import { ICrudRepository } from "../../../../domain/interfaces/ICrudRepository";
import { Group } from "../../../../domain/types/Group";
import { errorMessage } from "../../../../types/input";
import { JoinGroup } from "../types/GroupResult";


export interface IGroupRepository extends ICrudRepository<Group> {
    getAllByUser(idUser: string): Promise<Group[] | errorMessage>,
    joinGroup(joinGroup: JoinGroup): Promise<boolean | errorMessage>
}