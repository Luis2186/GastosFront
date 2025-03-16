export interface ICrudRepository<T> {
    getAll(): Promise<T[] | null>,
    getById(id: number | string): Promise<T | null>,
    update(id: number | string, entity: T): Promise<T | null>,
    create(entity: T): Promise<T | null>,
    delete(id: number | string): Promise<boolean>,
}