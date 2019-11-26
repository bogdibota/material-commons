import { DVKForm } from '@dvkiin/material-commons';
import { Grid, Paper, Typography } from '@material-ui/core';
import React, { FC, useMemo, useState } from 'react';
import useStyles from '../styles';

const FormSection: FC = () => {
  const { card, pre, leftForm } = useStyles();

  const [submittedEmpty, submitEmpty] = useState();
  const [submittedDefaulted, submitDefaulted] = useState();
  const [changedEmpty, changeEmpty] = useState();
  const [changedDefaulted, changeDefaulted] = useState();

  const defaultValue = useMemo(() => ({
    id: 123,
    name: 'Dorel Valorosu',
    email: 'dorel@dorel.com',
    hiddenId: 'hidden 123',
  }), []);

  return <Grid container wrap="wrap">
    <Paper className={ card }>
      <DVKForm
        className={ leftForm }
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
          {
            name: 'termsAndConditions',
            label: 'Terms and conditions',
            text: 'I accept the terms and conditions',
            type: 'checkbox',
            checkboxProps: { color: 'primary' },
            required: true,
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
          termsAndConditions: 'You must accept the terms and conditions to continue',
        } }
        onSubmit={ submitEmpty }
        onChange={ changeEmpty }
        bottomContent={ <span>Stuff after the fields</span> }
      >
        Stuff before the fields
      </DVKForm>
    </Paper>

    <Paper className={ card }>
      <Typography>Empty form</Typography>
      <Typography>Submitted value</Typography>
      <pre className={ pre }>{ JSON.stringify(submittedEmpty) }</pre>
      <br/>
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
          { name: 'hiddenId', type: 'hidden' },
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
            values: [{ label: 'Romania', name: '1' }, { label: 'Not Romania', name: '2' }],
            infoModal: {
              message: 'Here you should provide your location.',
              title: 'LOCATIONNN',
              buttonProps: { color: 'secondary' },
            },
          },
          {
            name: 'avatar',
            label: 'Avatar',
            type: 'image',
            required: true,
          },
          {
            name: 'file',
            label: 'File',
            type: 'file',
            required: true,
            acceptedFileType: 'application/pdf',
            multiple: true,
          },
          {
            name: 'terms and conditions',
            label: 'Terms and conditions',
            type: 'checkbox',
            required: true,
          },
        ] }
        defaultValue={ defaultValue }
        invalidFields={ null }
        onSubmit={ submitDefaulted }
        onChange={ changeDefaulted }
      />
    </Paper>

    <Paper className={ card }>
      <Typography>Defaulted value form</Typography>
      <Typography>Submitted value</Typography>
      <pre className={ pre }>{ JSON.stringify(submittedDefaulted) }</pre>
      <br/>
      <Typography>Changed value</Typography>
      <pre className={ pre }>{ JSON.stringify(changedDefaulted) }</pre>
    </Paper>

  </Grid>;
};

export default FormSection;
