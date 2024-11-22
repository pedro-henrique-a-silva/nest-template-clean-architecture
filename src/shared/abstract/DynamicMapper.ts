import { Optional } from './Optional'

export abstract class BaseMapper<PrismaType, EntityType> {
  /**
   * Mapeia um objeto do Prisma para uma entidade de domínio.
   * @param data Optional contendo o dado do Prisma
   * @returns Optional contendo a entidade mapeada
   */
  abstract toEntity(data: Optional<PrismaType>): Optional<EntityType>
}
