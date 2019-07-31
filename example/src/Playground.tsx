import { DVKForm, FloatingButton, InputModal, useModal } from '@dvkiin/material-commons';
import { Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: 400,
  },
  pre: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  moreDistance: {
    '&.override': {
      right: 100,
    },
  },
}));

export default function Playground() {
  const { container, card, pre, moreDistance } = useStyles();
  const [ submitted, submit ] = useState();
  const [ changed, change ] = useState();
  const { open: inputModalOpen, show: showInputModal, close: closeInputModal } = useModal();

  return <div className={ container }>
    <Paper className={ card }>
      <DVKForm
        fields={ [
          { name: 'id', label: 'numeric id', type: 'number', autoFocus: true },
          { name: 'name', label: 'string name', type: 'text' },
          { name: 'email', label: 'string email', type: 'email' },
          { name: 'password', label: 'string password', type: 'password' },
        ] }
        onSubmit={ submit }
        onChange={ change }
      />
    </Paper>

    <Paper className={ card }>
      <Typography>Submitted value</Typography>
      <pre className={ pre }>{ JSON.stringify(submitted) }</pre>
    </Paper>

    <Paper className={ card }>
      <Typography>Changed value</Typography>
      <pre className={ pre }>{ JSON.stringify(changed) }</pre>
    </Paper>

    <Paper className={ card }>
      <Typography>Input modal</Typography>
      <Button onClick={ showInputModal }>Show input modal</Button>
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

    <FloatingButton onClick={ console.log } className={ clsx('override', moreDistance) }>
      i float
    </FloatingButton>
  </div>;

}
