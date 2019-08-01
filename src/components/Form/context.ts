import React from 'react';
import { DVKObject, DVKValue } from './domain';

const FormContext = React.createContext({
  obj: {},
  updateProperty: () => undefined,
  updatePropertyF: () => undefined,
  showInfoModal: () => undefined,
} as {
  obj: DVKObject,
  updateProperty: (property: string, type: string) => any,
  updatePropertyF: (property: string, update: (value: DVKValue) => DVKValue) => any,
  showInfoModal: (data: any) => void
});

export default FormContext;
