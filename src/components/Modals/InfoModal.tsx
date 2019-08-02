import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FC } from 'react';

import { SlideUp } from './common';

export type InfoModalProps = {
  open: boolean,
  onClose: () => void,
  message: string,
  title: string
}

const InfoModal: FC<InfoModalProps> = ({ open, message, title, onClose }) => {
  return (
    <Dialog
      TransitionComponent={ SlideUp }
      open={ open }
      onClose={ onClose }
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{ title || '' }</DialogTitle>
      <DialogContent>
        <DialogContentText>{ message || '' }</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
