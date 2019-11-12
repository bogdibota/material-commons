import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FC, ReactElement, useCallback } from 'react';

import DVKForm from '../Form';
import { DVKField, DVKObject } from '../Form/domain';
import { FlexExpander } from '../placeholders';

import { SlideUp } from './common';

export type InputModalProps = {
  open: boolean,
  title: string,
  formKey?: string,
  saveLabel?: string,

  onClose: () => void,
  onCreate?: (obj: DVKObject) => void,
  onChange?: (obj: DVKObject) => void,

  fields: DVKField[],
  defaultValue?: DVKObject,
  invalidFields?: { [key: string]: boolean | string },

  renderActions?: (formId: string) => ReactElement | null,

};

// these values are used for change detection
const defaultProps = { defaultValue: {}, formKey: 'staticKey' };

const InputModal: FC<InputModalProps> = ({
                                           open,
                                           onClose,
                                           onCreate = () => null,
                                           onChange = () => null,
                                           title,
                                           fields,
                                           defaultValue = defaultProps.defaultValue,
                                           formKey = defaultProps.formKey,
                                           children,
                                           invalidFields = {},
                                           saveLabel = 'Create',
                                           renderActions = null,
                                         }) => {
  const actualRenderActions = useCallback((formId: string) => {
    if (renderActions) return renderActions(formId);
    return <>
      <Button onClick={ onClose }>
        Cancel
      </Button>
      <FlexExpander/>
      <Button color="primary" type="submit" form={ formId }>
        { saveLabel }
      </Button>
    </>;
  }, [onClose, saveLabel, renderActions]);

  return (
    <Dialog
      aria-labelledby="input-dialog-title"
      TransitionComponent={ SlideUp }
      open={ open }
      onClose={ onClose }
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="input-dialog-title">{ title }</DialogTitle>
      <DVKForm
        key={ formKey }
        fields={ fields }
        defaultValue={ defaultValue }
        ContentWrapper={ DialogContent }
        ActionsWrapper={ DialogActions }
        renderActions={ actualRenderActions }
        onSubmit={ onCreate }
        onChange={ onChange }
        invalidFields={ invalidFields }
      >{ children }</DVKForm>
    </Dialog>
  );
};

export default InputModal;
