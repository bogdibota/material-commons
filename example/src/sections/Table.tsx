import { createDefaultActions, DVKSort, DVKTable, uuid } from '@dvkiin/material-commons';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useReducer, useState } from 'react';

import useStyles from '../styles';

function reduceRows(oldRows: any[], payload: { type: string, data: any }) {
  switch (payload.type) {
    case 'add':
      return [...oldRows, ...payload.data];
    case 'sort':
      const { order, orderBy } = payload.data;
      return oldRows.sort((a, b) => (order === 'desc' ? -1 : 1) * (a[orderBy] > b[orderBy] ? 1 : -1));
    default:
      return [];
  }
}

const TableSection = () => {
  const { card, bigCard } = useStyles();

  const [sort, setSort] = useState<DVKSort | null>(null);
  const [rows, dispatch] = useReducer(reduceRows, []);

  function createRow() {
    return {
      id: uuid(),
      name: 'ana are mere',
      age: Math.random() * 100,
      match: Math.random() * 100,
    };
  }

  function addData(howMany: number) {
    dispatch({ type: 'add', data: new Array(howMany).fill(null).map(createRow) });
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
        sort={ sort }
        onPaginationSortUpdate={ (pagination, sort) => {
          if (!sort) return;
          setSort(sort);
          dispatch({ type: 'sort', data: sort });
        } }
        columns={ [
          { name: 'id', label: 'Id', type: 'string', noSort: true },
          { name: 'name', label: 'Name', type: 'string' },
          { name: 'age', label: 'Age', type: 'number', project: it => Math.round(it).toString() },
          { name: 'match', label: 'Match', type: 'number', project: it => `${ Math.round(it) }%` },
        ] }
        rows={ rows }
        actions={ createDefaultActions({ onDelete: console.log, onEdit: console.log, onClone: console.log }) }
      />
    </Paper>
  </Grid>;
};

export default TableSection;
