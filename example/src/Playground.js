import React, { useState } from 'react';

import { DVKForm } from '@dvkiin/material-commons';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
}));

export default function Playground() {
  const { container, card, pre } = useStyles();
  const [submitted, submit] = useState();
  const [changed, change] = useState();

  return <div className={container}>
    <Paper className={card}>
      <DVKForm
        fields={[
          { name: 'id', label: 'numeric id', type: 'number', autoFocus: true },
          { name: 'name', label: 'string name', type: 'text' },
          { name: 'email', label: 'string email', type: 'email' },
          { name: 'password', label: 'string password', type: 'password' },
        ]}
        onSubmit={submit}
        onChange={change}
      />
    </Paper>

    <Paper className={card}>
      <Typography>Submitted value</Typography>
      <pre className={pre}>{JSON.stringify(submitted)}</pre>
    </Paper>

    <Paper className={card}>
      <Typography>Changed value</Typography>
      <pre className={pre}>{JSON.stringify(changed)}</pre>
    </Paper>
  </div>;
}
