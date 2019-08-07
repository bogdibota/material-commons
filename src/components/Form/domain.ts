export type DVKValue = string | number | DVKObject | DVKListItem[]

export type DVKObject = {
  [key: string]: DVKValue
}

export type DVKListItem = {
  id: any,
  syntheticId: string,
}

type BasicField<TType> = {
  name: string, label: string, type: TType,
}

export type FieldWithErrorManagement = {
  errorMessage?: string | { [key: string]: string },
}

export type PropsWithErrorManagement = {
  hasError: boolean,
  message: string | undefined,
}

export type DVKFieldMashed = DVKField & DVKDateTimeField & DVKListField & DVKSelectField & DVKDefaultField

export type DVKFieldType = DVKDateTimeType | DVKListType | DVKSelectType | DVKDefaultType
export type DVKField = (DVKDateTimeField | DVKListField | DVKSelectField | DVKDefaultField)
  & {
  infoModal?: { title: string, message: string, buttonProps?: any },
}

export type DVKDateTimeType = 'date' | 'time' | 'date-time';
export type DVKDateTimeField = BasicField<DVKDateTimeType> & FieldWithErrorManagement & {
  required?: boolean,
  disabled?: boolean,
}

export type DVKListType = 'list';
export type DVKListField = BasicField<DVKListType> & {
  fields: DVKField[],
  editLabel?: (value: DVKListItem) => string,
  deleteLabel?: (value: DVKListItem) => string,
  deleteMessage?: (value: DVKListItem) => string,

  InputModal: any
}

export type DVKSelectType = 'select';
export type DVKSelectField = BasicField<DVKSelectType> & FieldWithErrorManagement & {
  required?: boolean,
  autoFocus?: boolean,
  disabled?: boolean,
  values: any[],
}

export type DVKDefaultType = 'text' | 'email' | 'password' | 'number';
export type DVKDefaultField = BasicField<DVKDefaultType> & FieldWithErrorManagement & {
  required?: boolean,
  autoFocus?: boolean,
  disabled?: boolean,
  autoComplete?: string,
  multiline?: boolean,
}
