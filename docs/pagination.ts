import { ApiProperty } from '@nestjs/swagger'

export class IPagination<T> {
  @ApiProperty() currentPage!: number
  @ApiProperty() itemsPerPage!: number
  @ApiProperty() totalItems!: number
  @ApiProperty() totalPages!: number
  @ApiProperty() data!: T[]
}
