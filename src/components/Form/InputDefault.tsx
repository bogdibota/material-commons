import { Box, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InfoIcon from '@material-ui/icons/Info';
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

  infoModal?: { title: string, message: string },
}

const InputDefault: FunctionComponent<InputDefaultProps> = ({ name, label, autoFocus, type, autoComplete, multiline, required, disabled, hasError, message, infoModal }) => {
  const { obj, updateProperty, showInfoModal } = useContext(FormContext);

  function getValue(obj: DVKObject, name: string): any {
    const value = deepGet(obj, name);
    if (value === undefined)
      return '';
    return value;
  }

  return (
    <Box display="flex">
      <Box flexGrow={ 1 }>
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
          value={ getValue(obj, name) }
          onChange={ updateProperty(name, type) }
          error={ hasError }
          helperText={ message }
        />
      </Box>

      { infoModal &&
      <Box display="flex" justifyContent="center" flexDirection="column">
        <IconButton size='small' onClick={ () => showInfoModal(infoModal) }><InfoIcon/></IconButton>
      </Box> }

    </Box>
  );
};

export default InputDefault;
