import React, { FunctionComponent, useContext } from 'react';
import TextField from '@material-ui/core/TextField';

import { deepGet } from '../../lib';

import FormContext from './context';

export type InputDefaultProps = {
  name: string, label: string, type: string,
  required: boolean, autoFocus: boolean, disabled: boolean, multiline: boolean,
  autoComplete: string,

  hasError: boolean,
  message: string | undefined,
}

const InputDefault: FunctionComponent<InputDefaultProps> = ({name, label, autoFocus, type, autoComplete, multiline, required, disabled, hasError, message}) => {
  const {obj, updateProperty} = useContext(FormContext);

  return (
    <TextField
      id={ name }
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

      value={ deepGet(obj, name) || '' } // must not be undefined because we have a controlled component
      onChange={ updateProperty(name, type) }

      error={ hasError }
      helperText={ message }
    />
  );
};

export default InputDefault;
