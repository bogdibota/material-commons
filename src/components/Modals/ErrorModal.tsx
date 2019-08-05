import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FC, useState } from 'react';

import { SlideUp } from './common';

export type ErrorModalProps = {
  message?: string,
  error: any,
}

const ErrorModal: FC<ErrorModalProps> = ({
                                           message = 'There was an error. Please check your input and try again.',
                                           error,
                                         }) => {
  const [ open, setOpen ] = useState(true);

  function renderActions() {
    return <>
      <Button onClick={ () => setOpen(false) }>
        Ok
      </Button>
    </>;
  }

  function renderMessage() {
    if (Array.isArray(message)) {
      return message.map(msg => <p key={ msg }>{ msg }</p>);
    }
    return message;
  }

  return (
    error && <Dialog
      aria-labelledby="error-dialog-title"
      TransitionComponent={ SlideUp }
      open={ open }
      onClose={ () => setOpen(false) }
      fullWidth
      maxWidth="sm"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">        { renderMessage() }      </DialogContentText>
      </DialogContent>
      <DialogActions>{ renderActions() }</DialogActions>
    </Dialog>
  ) || null;
};

export default ErrorModal;
