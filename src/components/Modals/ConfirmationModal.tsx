import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FC, Fragment } from 'react';

import { SlideUp } from './common';

export type ConfirmationModalProps = {
  open: boolean,
  message: string,
  title: string,
  onCancel: () => void,
  onAccept: () => void
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ open, message, title, onCancel, onAccept }) => {
  const renderActions = () => <Fragment>
    <Button onClick={ onCancel }>
      Cancel
    </Button>
    <Button onClick={ onAccept }>
      Ok
    </Button>
  </Fragment>;

  return (
    <Dialog
      aria-labelledby="confirmation-dialog-title"
      TransitionComponent={ SlideUp }
      open={ open }
      onClose={ onCancel }
      fullWidth
      maxWidth="sm"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{ title }</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">{ message }</DialogContentText>
      </DialogContent>
      <DialogActions>{ renderActions() }</DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
