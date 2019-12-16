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
import { DVKField, DVKFieldMashed, DVKInvalidFields, DVKObject, DVKValue, FieldWithErrorManagement } from './domain';
import InputCheckbox from './input/Checkbox';
import InputDateTime from './input/DateTime';
import InputDefault from './input/Default';
import InputFile from './input/File';
import InputHidden from './input/Hidden';
import InputImage from './input/Image';
import InputList from './input/List';
import InputSelect from './input/Select';


export type DVKFormProps = {
  className?: string,

  bottomContent?: ReactNode,
  defaultValue?: DVKObject,
  fields: DVKField[],
  ContentWrapper?: ComponentType,
  ActionsWrapper?: ComponentType,
  renderActions?: (formId: string) => ReactElement | null,
  onSubmit?: (obj: DVKObject) => void,
  onChange?: (obj: DVKObject) => void,
  invalidFields?: DVKInvalidFields | null,
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

function strip(value: any) {
  const newObj = { ...value };
  delete newObj.__typename;
  delete newObj.synteticId;
  return newObj;
}

function needsStripping(value: any): boolean {
  return value.synteticId || value.__typename;
}

// TODO deep check
function stripSyntheticIds(obj: DVKObject): DVKObject {
  return Object.keys(obj).reduce((acc, key) => ({
    ...acc,
    [key]: Array.isArray(obj[key])
      ? (obj[key] as DVKValue[]).map(value => needsStripping(value) ? strip(value) : value)
      : obj[key],
  }), {});
}

// these values are used for change detection
const defaultProps = { defaultValue: {} };

const DVKForm: FunctionComponent<DVKFormProps> = ({
                                                    className,
                                                    children,
                                                    bottomContent,

                                                    defaultValue = defaultProps.defaultValue,
                                                    fields,

                                                    ContentWrapper = Fragment,
                                                    ActionsWrapper = Fragment,
                                                    renderActions = null,

                                                    onSubmit = () => null,
                                                    onChange = () => null,

                                                    invalidFields = null,

                                                    InputModal = Fragment, // hack to avoid circular dependencies; better solutions are welcome
                                                  }) => {
  const [obj, setObj] = useState({ ...defaultValue });
  const formId = useMemo(() => {
    setObj({ ...defaultValue });
    return uuid();
  }, [defaultValue]);

  const { isOpen: isInfoModalOpen, data: infoModalData, open: openInfoModal, close: closeInfoModal } = useModal();

  useEffect(() => {
    onChange(obj);
  }, [obj, onChange]);

  function handleSubmit(event: React.MouseEvent<HTMLFormElement>) {
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
      case 'image':
        value = event;
        break;
      case 'file':
        value = event;
        break;
      case 'checkbox':
        value = event.target.checked;
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

                              //file
                              acceptedFileType, multiple,

                              // select
                              values,

                              // list
                              fields, editLabel, deleteLabel, deleteMessage,

                              // checkbox
                              text, checkboxProps,
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
      case 'image':
        return <InputImage
          { ...commonProps }

          required={ required }
          disabled={ disabled }
          autoFocus={ autoFocus }

          { ...errorProps }
        />;
      case 'file':
        return <InputFile
          { ...commonProps }

          required={ required }
          disabled={ disabled }
          acceptedFileType={ acceptedFileType }
          multiple={ multiple }
          { ...errorProps }
        />;
      case 'checkbox':
        return <InputCheckbox
          { ...commonProps }

          required={ required }
          disabled={ disabled }
          text={ text }
          checkboxProps={ checkboxProps }

          { ...errorProps }
        />;
      case 'hidden':
        return <InputHidden { ...commonProps }/>;
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
    return <Box key={ field.name } display="flex" style={ field.type === 'hidden' ? { display: 'none' } : {} }>
      <Box flexGrow={ 1 }>
        { renderInputField(field as DVKFieldMashed) }
      </Box>

      { field.infoModal &&
      <Box display="flex" justifyContent="center" flexDirection="column">
        <IconButton size='medium'
                    { ...(field.infoModal.buttonProps || {}) }
                    onClick={ () => openInfoModal({
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
    <form key={ formId } id={ formId } className={ className } onSubmit={ handleSubmit }>
      <ContentWrapper>
        <FormContext.Provider value={ {
          obj,
          updateProperty,
          updatePropertyF,
        } }>
          { children }
          { fields
            .map((field) => renderInputBox(field))
            .reduce((acc: ReactNode[], it: ReactNode) => acc.concat(it), [])
          }
          { bottomContent }
          <InfoModal
            onClose={ closeInfoModal }
            open={ isInfoModalOpen }
            message={ (infoModalData && infoModalData.message) || '' }
            title={ (infoModalData && infoModalData.title) || '' }
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
