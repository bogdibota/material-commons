import { DVKForm, FloatingButton, InfoModal, InputModal, useModal } from '@dvkiin/material-commons';
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
  const [ submittedEmpty, submitEmpty ] = useState();
  const [ submittedDefaulted, submitDefaulted ] = useState();
  const [ changedEmpty, changeEmpty ] = useState();
  const [ changedDefaulted, changeDefaulted ] = useState();

  const { open: inputModalOpen, show: showInputModal, close: closeInputModal } = useModal();
  const { open: openInfoModal, show: showInfoModal, close: closeInfoModal } = useModal();

  return <div className={ container }>
    <Paper className={ card }>
      <DVKForm
        fields={ [
          {
            type: 'number',
            name: 'id', label: 'numeric id', autoFocus: true,
            infoModal: {
              message: 'Here you should provide your id.',
              title: 'ID TITLE',
            },
          },
          {
            type: 'text',
            name: 'name',
            label: 'string name',
            infoModal: {
              message: 'Here you should provide your name.',
              title: 'Name input',
              buttonProps: { color: 'primary' },
            },
          },
          {
            type: 'email',
            name: 'email',
            label: 'string email',
            infoModal: {
              message: 'Here you should provide your EMAIL.',
              title: 'Email input',
              buttonProps: { color: 'secondary' },
            },
          },
          { name: 'password', label: 'string password', type: 'password' },
          { name: 'q1', label: 'q1', type: 'date', required: true },
          {
            name: 'q2', label: 'q2', type: 'date-time',
            infoModal: {
              message: 'Here you should provide your birthtime.',
              title: 'Birthtime',
              buttonProps: { color: 'secondary' },
            },
            errorMessage: 'me w/e you write in invalidFields',
          },
          {
            name: 'q3', label: 'q3', type: 'time',
            errorMessage: { 'code1': 'i am not valid because of code 1' },
          },
          { name: 'q4', label: 'q4', type: 'date', disabled: true },
        ] }
        invalidFields={ {
          q3: 'code1',
          q2: 'w/e code here',
          email: 'directly this error message',
          name: true,
        } }
        onSubmit={ submitEmpty }
        onChange={ changeEmpty }
      />
    </Paper>

    <Paper className={ card }>
      <Typography>Empty form</Typography>
      <Typography>Submitted value</Typography>
      <pre className={ pre }>{ JSON.stringify(submittedEmpty) }</pre>
    </Paper>

    <Paper className={ card }>
      <Typography>Empty form</Typography>
      <Typography>Changed value</Typography>
      <pre className={ pre }>{ JSON.stringify(changedEmpty) }</pre>
    </Paper>

    <Paper className={ card }>
      <DVKForm
        fields={ [
          {
            name: 'id', label: 'numeric id', type: 'number', autoFocus: true,
            infoModal: {
              message: 'Here you should provide your id.',
              title: 'ID TITLE',
            },
          },
          {
            name: 'name',
            label: 'string name',
            type: 'text',
            infoModal: {
              message: 'Here you should provide your name.',
              title: 'Name input',
              buttonProps: { color: 'primary' },
            },
          },
          {
            name: 'email',
            label: 'string email',
            type: 'email',
          },
          { name: 'password', label: 'string password', type: 'password' },
          {
            name: 'location',
            label: 'Location',
            type: 'select',
            values: [ { label: 'Romania', name: 1 }, { label: 'Not Romania', name: 2 } ],
            infoModal: {
              message: 'Here you should provide your location.',
              title: 'LOCATIONNN',
              buttonProps: { color: 'secondary' },
            },
          },
        ] }
        defaultValue={ {
          id: 123,
          name: 'Dorel Valorosu',
          email: 'dorel@dorel.com',
        } }
        onSubmit={ submitDefaulted }
        onChange={ changeDefaulted }
      />
    </Paper>

    <Paper className={ card }>
      <Typography>Defaulted value form</Typography>
      <Typography>Submitted value</Typography>
      <pre className={ pre }>{ JSON.stringify(submittedDefaulted) }</pre>
    </Paper>

    <Paper className={ card }>
      <Typography>Defaulted value form</Typography>
      <Typography>Changed value</Typography>
      <pre className={ pre }>{ JSON.stringify(changedDefaulted) }</pre>
    </Paper>

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

    <FloatingButton onClick={ console.log } className={ clsx('override', moreDistance) }>
      i float
    </FloatingButton>
  </div>;
}
