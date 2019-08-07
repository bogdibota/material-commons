import { Box, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
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

import { deepSet, useModal, uuid } from '../../lib';
import InfoModal from '../Modals/InfoModal';

import FormContext from './context';
import { DVKField, DVKFieldMashed, DVKObject, DVKValue, FieldWithErrorManagement } from './domain';
import InputDefault from './input/Default';
import InputList from './input/List';
import InputSelect from './input/Select';
import InputDateTime from './input/DateTime';


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
      return value === '' ? '' : +(value || 0);
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
  const { open: openInfoModal, close: closeInfoModal, show: showInfoModal, data: dataInfoModal } = useModal();

  useEffect(() => {
    onChange(obj);
  }, [ obj, onChange ]);

  function handleSubmit(event: Event | any) { // WTF?
    event.preventDefault();
    event.stopPropagation();

    onSubmit(stripSyntheticIds(obj));
  }

  const updateProperty = (property: string, type: string) => (event: any) => {
    let value: any;
    switch (type) {
      case 'date':
      case 'time':
      case 'date-time':
        value = event;
        break;
      default :
        value = event.target.value;
    }

    setObj((oldObj) => {
      const newObject = { ...oldObj };
      deepSet(newObject, property, convertValue(value, type));
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

  function getErrorMessage(errorMessageCode: string | any, errorMessage: FieldWithErrorManagement['errorMessage']) {
    if (!errorMessageCode) return;

    if (typeof errorMessage === 'string') return errorMessage;
    const code = typeof errorMessageCode === 'string' ? errorMessageCode : 'default';

    if (!errorMessage && typeof errorMessageCode !== 'string') return 'Invalid value';
    if (!errorMessage) return code;

    return errorMessage[code];
  }

  function renderInputField({
                              name, label, type,

                              errorMessage,

                              // default
                              required, autoFocus, disabled, multiline, autoComplete,

                              // select
                              values,

                              // list
                              fields, editLabel, deleteLabel, deleteMessage,
                            }: DVKFieldMashed): ReactNode {
    const errorMessageCode = (invalidFields && invalidFields[name]);
    const message = getErrorMessage(errorMessageCode, errorMessage);

    const commonProps = {
      key: name, name, label, type,
    };

    const errorProps = {
      hasError: !!errorMessageCode, message,
    };

    switch (type) {
      case 'list':
        return <InputList
          { ...commonProps }

          fields={ fields }
          editLabel={ editLabel }
          deleteLabel={ deleteLabel }
          deleteMessage={ deleteMessage }
          InputModal={ InputModal }
        />;
      case 'select':
        return <InputSelect
          { ...commonProps }

          values={ values }
          required={ required }
          autoFocus={ autoFocus }
          disabled={ disabled }

          { ...errorProps }
        />;
      case 'date':
      case 'time':
      case 'date-time':
        return <InputDateTime
          { ...commonProps }

          required={ required }
          disabled={ disabled }

          { ...errorProps }
        />;
      default:
        return <InputDefault
          { ...commonProps }

          autoFocus={ autoFocus }
          autoComplete={ autoComplete }
          multiline={ multiline }
          required={ required }
          disabled={ disabled }

          { ...errorProps }
        />;
    }
  }

  function renderInputBox(field: DVKField): ReactNode {
    return <Box key={ field.name } display="flex">
      <Box flexGrow={ 1 }>
        { renderInputField(field as DVKFieldMashed) }
      </Box>

      { field.infoModal &&
      <Box display="flex" justifyContent="center" flexDirection="column">
        <IconButton size='medium'
                    { ...(field.infoModal.buttonProps || {}) }
                    onClick={ () => showInfoModal({
                      message: field.infoModal!.message,
                      title: field.infoModal!.title,
                    }) }
        >
          <InfoIcon/>
        </IconButton>
      </Box> }
    </Box>;
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
            .map((field) => renderInputBox(field)) // down-typing
            .reduce((acc: ReactNode[], it: ReactNode) => acc.concat(it), [])
          }
          <InfoModal
            onClose={ closeInfoModal }
            open={ openInfoModal }
            message={ (dataInfoModal && dataInfoModal.message) || '' }
            title={ (dataInfoModal && dataInfoModal.title) || '' }
          />
        </FormContext.Provider>
      </ContentWrapper>

      <ActionsWrapper>{ renderActions && typeof renderActions === 'function' && renderActions(formId) }</ActionsWrapper>

      {/* hack to submit on enter */ }
      <button type="submit" style={ { display: 'none' } } form={ formId }/>
    </form>
  );
};

export default DVKForm;
