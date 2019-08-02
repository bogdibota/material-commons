import TextField from '@material-ui/core/TextField';
import React, { FunctionComponent, useContext } from 'react';

import { deepGet } from '../../lib';

import FormContext from './context';
import { DVKObject } from './domain';

export type InputDefaultProps = {
  name: string, label: string, type: string,
  required: boolean, autoFocus: boolean, disabled: boolean, multiline: boolean,
  autoComplete: string,

  hasError: boolean,
  message: string | undefined,

  infoModal?: { title: string, message: string, buttonProps?: any },
}

const InputDefault: FunctionComponent<InputDefaultProps> = ({ name, label, autoFocus, type, autoComplete, multiline, required, disabled, hasError, message }) => {
  const { obj, updateProperty } = useContext(FormContext);

  function getValue(obj: DVKObject, name: string): any {
    const value = deepGet(obj, name);
    if (value === undefined)
      return '';
    return value;
  }

  return (
    <TextField
      name={ name }
      label={ label }
      autoFocus={ autoFocus }
      type={ type }
      autoComplete={ autoComplete }
      multiline={ multiline }
      rows={ 4 }
      rowsMax={ 10 }
      required={ required }
      disabled={ disabled }
      margin="dense"
      fullWidth
      value={ getValue(obj, name) }
      onChange={ updateProperty(name, type) }
      error={ hasError }
      helperText={ message }
    />
  );
};

export default InputDefault;
