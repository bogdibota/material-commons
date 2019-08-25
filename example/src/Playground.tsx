import {
  FloatingButton,
  InfoModal,
  InputModal,
  SuccessSnackbar,
  useIncrementalKey,
  useModal,
} from '@dvkiin/material-commons';
import { Button, Paper, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import useStyles from './styles';


export default function Playground() {
  const { container, card, moreDistance, verticalCenter, gutterRight } = useStyles();

  const { open: inputModalOpen, show: showInputModal, close: closeInputModal } = useModal();
  const { open: openInfoModal, show: showInfoModal, close: closeInfoModal } = useModal();

  const [ snackbarKey, triggerSnackbar ] = useIncrementalKey();
  const snackbarRef = useRef<SuccessSnackbar>(null);

  console.log('Render called');

  useEffect(() => {
    console.log('I wanna be called once');
  }, [ showInfoModal ]);


  return <div className={ container }>
    <Paper className={ card }>
      <Typography>Input modal</Typography>
      <Button color='primary' onClick={ showInputModal }>Show input modal</Button>
      <InputModal
        open={ inputModalOpen }
        title="Input modal example"
        fields={ [
          { name: 'id', label: 'numeric id', type: 'number', autoFocus: true },
          { name: 'name', label: 'string name', type: 'text' },
          { name: 'email', label: 'string email', type: 'email' },
        ] }
        onClose={ closeInputModal }
        onCreate={ console.log }
      />
    </Paper>

    <Paper className={ card }>
      <Typography>Info modal</Typography>
      <Button onClick={ showInfoModal }>Show info modal</Button>
      <InfoModal
        message="i am message"
        title="i am title"
        onClose={ closeInfoModal }
        open={ openInfoModal }
      />
    </Paper>

    <Paper className={ card }>
      <Typography>Snackbar</Typography>
      <Button color='primary' onClick={ triggerSnackbar }>Show success snackbar</Button>
      { (snackbarKey && <SuccessSnackbar
        key={ snackbarKey }
        ref={ snackbarRef }
        message={ <Typography variant="subtitle1" className={ verticalCenter }>
          <AddIcon className={ gutterRight }/>
          Le magic snackbar
        </Typography>
        }
        action={
          <Button color="inherit" size="small" onClick={ () => snackbarRef.current!.handleClose() }>
            Close me
          </Button>
        }
      />) || null }
    </Paper>

    <FloatingButton
      color="primary" aria-label="floating stuff"
      onClick={ () => console.log('FAB clicked') }
      className={ clsx('override', moreDistance) }
    >
      i float
    </FloatingButton>
  </div>;
}
