export type DVKColumn = {
  name: string,
  label: string,
  numeric?: boolean
}


export type DVKPagination = {
  page: number,
  rowsPerPage: number,
  order: string,
  orderBy: string
}
