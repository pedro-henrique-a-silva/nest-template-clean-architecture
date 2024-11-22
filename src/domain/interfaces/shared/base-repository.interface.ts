import { Optional } from 'shared/abstract/Optional'

export interface BaseCrudRepository<T> {
  create(data: T): Promise<Optional<T>>
  update(id: number, data: T): Promise<Optional<T>>
  delete(id: number): Promise<void>
  findById(id: number): Promise<Optional<T>>
  findByEmail(email: string): Promise<Optional<T>>
}
