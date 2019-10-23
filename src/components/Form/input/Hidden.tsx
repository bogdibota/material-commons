import TextField from '@material-ui/core/TextField';
import React, { FunctionComponent, useContext } from 'react';

import { deepGet } from '../../../lib';

import FormContext from '../context';
import { DVKHiddenField } from '../domain';

const InputHidden: FunctionComponent<DVKHiddenField> = ({ name, type }) => {
  const { obj } = useContext(FormContext);

  return (
    <TextField
      name={ name }
      type={ type }
      disabled
      hidden
      value={ deepGet(obj, name, '') }
    />
  );
};

export default InputHidden;
