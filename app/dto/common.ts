/**
 * 分页基本字段
 */
export interface Pagination {
  pageSize: number
  pageIndex: number
}

/**
 * 分页接口返回格式
 */
export interface PaginationData extends Pagination {
  total: number
  list: any[]
}
