export type DVKValue = string | number | DVKObject | DVKListItem[]

export type DVKObject = {
  [key: string]: DVKValue
}

export type DVKListItem = {
  id: any,
  syntheticId: string,
}

export type DVKField = {
  name: string, label: string, type: string,

  required?: boolean, autoFocus?: boolean, disabled?: boolean, multiline?: boolean,
  errorMessage?: string | any
  autoComplete?: string,
  fields?: DVKField[],
  values?: any[],
  editLabel?: (value: any) => string,
  deleteLabel?: (value: any) => string,
  deleteMessage?: (value: any) => string,
}
