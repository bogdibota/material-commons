import React from 'react';
import { DVKObject, DVKValue } from './domain';

const FormContext = React.createContext({
  obj: {},
  updateProperty: () => undefined,
  updatePropertyF: () => undefined,
} as {
  obj: DVKObject,
  updateProperty: (property: string, type: string) => any,
  updatePropertyF: (property: string, update: (value: DVKValue) => DVKValue) => any,
});

export default FormContext;
