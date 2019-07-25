import React, { FunctionComponent, useContext } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

import { deepGet } from '../../lib';

import FormContext from './context';

export type InputSelectProps = {
  name: string, label: string, type: string,
  required: boolean, autoFocus: boolean, disabled: boolean,

  hasError: boolean,
  message: string | undefined,

  values: any[],
}

const InputSelect: FunctionComponent<InputSelectProps> = ({name, label, type, values, required, autoFocus, disabled, hasError, message}) => {
  const {obj, updateProperty} = useContext(FormContext);

  return <FormControl
    disabled={ disabled }
    error={ hasError }
    required={ required }
    fullWidth
  >
    <InputLabel htmlFor={ name }>{ label }</InputLabel>
    <Select
      value={ deepGet(obj, name) }
      onChange={ updateProperty(name, type) }
      inputProps={ {
        name,
        id: name,
        autoFocus,
      } }
    >
      { !required && <MenuItem value={ '' }>
        <em>None</em>
      </MenuItem> }
      { values.map((value) => {
        if (typeof value === 'string') return <MenuItem key={ value } value={ value }>{ value }</MenuItem>;
        return <MenuItem key={ value.name } value={ value.name }>{ value.label }</MenuItem>;
      }) }

      { message && <FormHelperText>{ message }</FormHelperText> }
    </Select>
  </FormControl>;
};

export default InputSelect;
