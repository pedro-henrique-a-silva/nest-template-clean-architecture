type PaginationOutputType = {
  page: number
  limit: number
  total: number
  rows: any[]
}
export class PaginationMapper {
  static toOutput(data: PaginationOutputType) {
    return {
      currentPage: 0,
      itemsPerPage: data.limit,
      totalItems: data.total,
      totalPages: Math.ceil(data.total / data.limit),
      data: data.rows,
    }
  }
}
