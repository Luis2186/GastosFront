import { errorMessage } from "../../types/input";

export interface ICrudRepository<T> {
    getAll(): Promise<T[] | errorMessage>,
    getById(id: number | string): Promise<T | errorMessage>,
    update(id: number | string, entity: T): Promise<T | errorMessage>,
    create(entity: T): Promise<T | errorMessage>,
    delete(id: number | string): Promise<boolean>,
}