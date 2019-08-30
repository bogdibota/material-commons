import React, { FunctionComponent, useContext } from 'react';
import { DatePicker, DateTimePicker, TimePicker } from '@material-ui/pickers';

import { deepGet } from '../../../lib';

import FormContext from '../context';
import { DVKDateTimeField, PropsWithErrorManagement } from '../domain';

const InputDateTime: FunctionComponent<DVKDateTimeField & PropsWithErrorManagement> = ({
                                                                                         name,
                                                                                         label,
                                                                                         type,

                                                                                         required = false,
                                                                                         disabled = false,

                                                                                         hasError,
                                                                                         message,
                                                                                       }) => {
  const { obj, updateProperty } = useContext(FormContext);

  const commonProps = {
    fullWidth: true,
    autoOk: true,
    margin: 'normal' as 'normal',
    name: name,
    label: label,
    required: required,
    disabled: disabled,
    value: deepGet(obj, name, null),
    onChange: updateProperty(name, type),
    error: hasError,
    helperText: message,
  };

  switch (type) {
    case 'date-time':
      return <DateTimePicker
        ampm={ false }
        { ...commonProps }
      />;
    case 'time':
      return <TimePicker
        ampm={ false }
        { ...commonProps }
      />;
    case 'date':
      return <DatePicker
        { ...commonProps }
      />;
  }
};

export default InputDateTime;
