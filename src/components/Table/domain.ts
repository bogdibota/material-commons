export type DVKColumn = {
  name: string,
  label: string,
  type: string,
  noSort?: boolean,
}

export type DVKSort = {
  order: 'desc' | 'asc',
  orderBy: string,
}

export type DVKPagination = {
  page: number,
  rowsPerPage: number,
}

export type DVKPaginationWithSort = DVKPagination & DVKSort;
