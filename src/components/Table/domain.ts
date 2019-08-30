export type DVKColumn = {
  name: string,
  label: string,
  type: string
}

export type DVKPagination = {
  page: number,
  rowsPerPage: number,
  order: 'desc' | 'asc',
  orderBy: string
}
