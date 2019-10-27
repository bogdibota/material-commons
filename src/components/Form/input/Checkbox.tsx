import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel } from '@material-ui/core';
import React, { FunctionComponent, useContext } from 'react';

import { deepGet } from '../../../lib';

import FormContext from '../context';
import { DVKCheckboxField, PropsWithErrorManagement } from '../domain';

const InputCheckbox: FunctionComponent<DVKCheckboxField & PropsWithErrorManagement> = ({
                                                                                         name,
                                                                                         label,
                                                                                         type,

                                                                                         required = false,
                                                                                         disabled = false,
                                                                                         text = '',
                                                                                         checkboxProps = {},

                                                                                         hasError,
                                                                                         message,
                                                                                       }) => {
  const { obj, updateProperty } = useContext(FormContext);

  const useLabelAsText = !text;
  const checkboxText = useLabelAsText ? label + (required ? ' *' : '') : text;

  return (<>
    <FormControl
      margin="dense"
      fullWidth
      required={ required }
      error={ hasError }
      component="fieldset"
    >
      { (!useLabelAsText) && <FormLabel component="legend">{ label }</FormLabel> }
      <FormControlLabel
        control={
          <Checkbox
            { ...checkboxProps }
            checked={ !!deepGet(obj, name, false) }
            onChange={ updateProperty(name, type) }
            value={ true }
          />
        }
        label={ checkboxText }
        disabled={ disabled }
      />
      { message && <FormHelperText>{ message }</FormHelperText> }
    </FormControl>
  </>);
};

export default InputCheckbox;
