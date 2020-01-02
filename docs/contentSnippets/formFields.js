import React, { Fragment } from 'react';

const joinJsx = (list, separator) => {
  let i = 0;
  return list && list.reduce((acc, curr) => [acc, separator(`separator-${ i++ }`), curr]);
};

export const LabeledField = ({ types }) => (
  <Fragment>
    <tr>
      <td>type *</td>
      <td>{ joinJsx(types.map(t => `'${ t }'`), (key) => <Fragment key={ key }><br/>|&nbsp;</Fragment>) }</td>
      <td/>
      <td>Used to distinguish from other fields.</td>
    </tr>
    <tr>
      <td>name *</td>
      <td>string</td>
      <td/>
      <td>
        The unique field key. This is used as a `key` in the field list and as the name of the property on the resulted
        object.
        Must be unique. Can be nested (`type.attributes`).
      </td>
    </tr>
    <tr>
      <td>label *</td>
      <td>string</td>
      <td/>
      <td>The label rendered on the input.</td>
    </tr>
  </Fragment>
);

export const WithRequired = () => (
  <tr>
    <td>required</td>
    <td>boolean</td>
    <td>false</td>
    <td>
      If true, the field is marked as required and the form cannot be submitted without a values for this field.
      `onChange` does not take this into account.
    </td>
  </tr>
);

export const WithDisabled = () => (
  <tr>
    <td>disabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>
      If true, the field is marked as disabled as is readonly.
      It's value (if provided via `defaultValue`) is sent on both `onChange` and `onSubmit`.
    </td>
  </tr>
);

export const WithAutoFocus = () => (
  <tr>
    <td>autoFocus</td>
    <td>boolean</td>
    <td>false</td>
    <td>
      If true, the field will be auto-focused when the form is rendered.
      Multiple fields with this property will interfere and the last one to be rendered will get the focus.
    </td>
  </tr>
);

export const WithErrorManagement = () => (
  <tr>
    <td>errorMessage</td>
    <td>string <br/>&#124; DVKErrorMessages</td>
    <td>null</td>
    <td>
      The error text to be displayed (if string), or a map of error codes (from `invalidFields`) to the error text (if
      DVKErrorMessages).
    </td>
  </tr>
);

