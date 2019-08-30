import { createDefaultActions, DVKTable, uuid } from '@dvkiin/material-commons';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useReducer } from 'react';

import useStyles from '../styles';

const TableSection = () => {
  const { card, bigCard } = useStyles();

  const [ rows, addRows ] = useReducer((oldRows, newRows) => [ ...oldRows, ...newRows ], []);

  function createRow() {
    return {
      id: uuid(),
      name: 'ana are mere',
      age: Math.random() * 100,
    };
  }

  function addData(howMany: number) {
    addRows(new Array(howMany).fill(null).map(createRow));
  }

  return <Grid container wrap="wrap">
    <Paper className={ card }>
      <Typography>Info modal</Typography>
      <Button onClick={ () => addData(10) }>add 10 rows</Button>
      <Divider/>
      <Button onClick={ () => addData(100) }>add 100 rows</Button>
    </Paper>
    <Paper className={ clsx(card, bigCard) }>
      <DVKTable
        columns={ [
          { name: 'id', label: 'Id', type: 'string' },
          { name: 'name', label: 'Name', type: 'string' },
          { name: 'age', label: 'Age', type: 'number' },
        ] }
        rows={ rows }
        actions={ createDefaultActions({ onDelete: console.log, onEdit: console.log, onClone: console.log }) }
      />
    </Paper>
  </Grid>;
};

export default TableSection;
