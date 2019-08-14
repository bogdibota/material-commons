export type DVKColumn = {
  name: string,
  label: string,
  numeric?: boolean,
  type: string
}


export type DVKPagination = {
  page: number,
  rowsPerPage: number,
  order: string,
  orderBy: string
}
