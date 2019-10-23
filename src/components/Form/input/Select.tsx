import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { FunctionComponent, useContext } from 'react';

import { deepGet } from '../../../lib';

import FormContext from '../context';
import { DVKSelectField, PropsWithErrorManagement } from '../domain';

const InputSelect: FunctionComponent<DVKSelectField & PropsWithErrorManagement> = ({
                                                                                     name,
                                                                                     label,
                                                                                     type,

                                                                                     values,
                                                                                     required = false,
                                                                                     autoFocus = false,
                                                                                     disabled = false,

                                                                                     hasError,
                                                                                     message,
                                                                                   }) => {
  const { obj, updateProperty } = useContext(FormContext);

  return <FormControl
    disabled={ disabled }
    error={ hasError }
    required={ required }
    fullWidth
    margin="dense"
  >
    <InputLabel htmlFor={ name }>{ label }</InputLabel>
    <Select
      value={ deepGet(obj, name, '') }
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
