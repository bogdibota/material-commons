import TextField from '@material-ui/core/TextField';
import React, { FunctionComponent, useContext } from 'react';

import { deepGet } from '../../../lib';

import FormContext from '../context';
import { DVKDefaultField, PropsWithErrorManagement } from '../domain';

const InputDefault: FunctionComponent<DVKDefaultField & PropsWithErrorManagement> = ({
                                                                                       name,
                                                                                       label,
                                                                                       type,

                                                                                       required = false,
                                                                                       autoFocus = false,
                                                                                       disabled = false,
                                                                                       multiline = false,
                                                                                       autoComplete = name,

                                                                                       hasError,
                                                                                       message,
                                                                                     }) => {
  const { obj, updateProperty } = useContext(FormContext);

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
      value={ deepGet(obj, name, '') }
      onChange={ updateProperty(name, type) }
      error={ hasError }
      helperText={ message }
    />
  );
};

export default InputDefault;
