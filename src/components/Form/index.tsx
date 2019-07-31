import React, {
  ComponentType,
  Fragment,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { deepSet, uuid } from '../../lib';

import FormContext from './context';
import { DVKField, DVKObject, DVKValue } from './domain';
import InputDefault from './InputDefault';
import InputList from './InputList';
import InputSelect from './InputSelect';


export type DVKFormProps = {
  children?: ReactNode | undefined,
  defaultValue?: DVKObject,
  fields: DVKField[],
  ContentWrapper?: ComponentType,
  ActionsWrapper?: ComponentType,
  renderActions?: (formId: string) => ReactElement | null,
  onSubmit?: (obj: DVKObject) => void,
  onChange?: (obj: DVKObject) => void,
  invalidFields?: { [key: string]: boolean | string },
  InputModal?: ComponentType,
};

function convertValue(value: DVKValue, type: string): any {
  switch (type) {
    case 'number':
      return value === '' ? null : +(value || 0);
    default:
      return value;
  }
}

function createDefaultObjFromFields(fields: DVKField[]): DVKObject {
  return fields.reduce((acc, it) => {
    const newObject = { ...acc };
    deepSet(newObject, it.name, '');
    return newObject;
  }, {});
}

// TODO deep check
function stripSyntheticIds(obj: DVKObject): DVKObject {
  return Object.keys(obj)
    .reduce((acc, key) => ({
      ...acc,
      [key]: Array.isArray(obj[key])
        ? (obj[key] as DVKValue[]).map((value: any) => Object.keys(value).reduce((sAcc, sKey) => {
          // we also strip typename, so the obj could be received and sent directly to apollo
          if ([ 'syntheticId', '__typename' ].indexOf(sKey) > -1) return sAcc;
          return { ...sAcc, [sKey]: value[sKey] };
        }, {}))
        : obj[key],
    }), {});
}


const DVKForm: FunctionComponent<DVKFormProps> = ({
                                                    children = [],

                                                    defaultValue = {},
                                                    fields,

                                                    ContentWrapper = Fragment,
                                                    ActionsWrapper = Fragment,
                                                    renderActions = null,

                                                    onSubmit = () => null,
                                                    onChange = () => null,

                                                    invalidFields = null,

                                                    InputModal = Fragment, // hack to avoid circular dependencies; better solutions are welcome
                                                  }) => {
  const [ obj, setObj ] = useState({ ...createDefaultObjFromFields(fields), ...defaultValue });
  const formId = useMemo(uuid, []);

  useEffect(() => {
    onChange(obj);
  }, [ obj, onChange ]);

  function handleSubmit(event: Event | any) { // WTF?
    event.preventDefault();
    event.stopPropagation();

    onSubmit(stripSyntheticIds(obj));
  }

  const updateProperty = (property: string, type: string) => ({ target: { value, files } }: any) => {
    setObj((oldObj) => {
      const newObject = { ...oldObj };
      deepSet(newObject, property, files ? files[0] : convertValue(value, type));
      return newObject;
    });
  };

  const updatePropertyF = (property: string, update: (value: DVKValue) => DVKValue) => {
    setObj((oldObj: DVKObject) => {
      const newObject = { ...oldObj };
      deepSet(newObject, property, update(oldObj[property]));
      return newObject;
    });
  };

  function renderInputField({
                              name, label, type,
                              required = false,
                              autoFocus = false,
                              disabled = false,
                              multiline = false,
                              errorMessage = 'Invalid value',
                              autoComplete = name,
                              fields = [],
                              values = [],
                              editLabel = ({ id }) => `Edit '${ id }'`,
                              deleteLabel = ({ id }) => `Delete '${ id }'`,
                              deleteMessage = () => '',
                            }: DVKField): ReactNode {
    const hasError = (invalidFields && invalidFields[name]);
    const message = hasError && (typeof hasError === 'string'
        ? (typeof errorMessage === 'string' ? errorMessage : errorMessage[hasError] || errorMessage.default)
        : (typeof errorMessage === 'string' ? errorMessage : errorMessage.default)
    );

    if (type === 'list') {
      return <InputList
        key={ name }
        name={ name }
        label={ label }
        fields={ fields }

        editLabel={ editLabel }
        deleteLabel={ deleteLabel }
        deleteMessage={ deleteMessage }

        InputModal={ InputModal }
      />;
    }

    if (type === 'select') {
      return <InputSelect
        key={ name }
        name={ name }
        label={ label }
        type={ type }
        values={ values }

        required={ required }
        autoFocus={ autoFocus }
        disabled={ disabled }

        hasError={ !!hasError }
        message={ message }
      />;
    }

    return (
      <InputDefault
        key={ name }
        name={ name }
        label={ label }
        autoFocus={ autoFocus }
        type={ type }
        autoComplete={ autoComplete }
        multiline={ multiline }
        required={ required }
        disabled={ disabled }
        hasError={ !!hasError }
        message={ message }
      />
    );
  }

  return (
    <form onSubmit={ handleSubmit } id={ formId }>
      <ContentWrapper>
        <FormContext.Provider value={ {
          obj,
          updateProperty,
          updatePropertyF,
        } }>
          { children }
          { fields
            .map((q) => renderInputField(q))
            .reduce((acc: Element[], it: Element) => acc.concat(it), [])
          }
        </FormContext.Provider>
      </ContentWrapper>

      <ActionsWrapper>{ renderActions && typeof renderActions === 'function' && renderActions(formId) }</ActionsWrapper>

      {/* hack to submit on enter */ }
      <button type="submit" style={ { display: 'none' } } form={ formId }/>
    </form>
  );
};

export default DVKForm;
