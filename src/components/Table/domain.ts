export type DVKProjectFn<TData = any> = (value: TData) => string;

export type DVKColumn<TData = any> = {
  name: string,
  label: string,
  type: string,
  noSort?: boolean,
  project?: DVKProjectFn<TData>
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
