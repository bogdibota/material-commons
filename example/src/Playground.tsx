import { FloatingButton } from '@dvkiin/material-commons';
import React from 'react';
import useStyles from './styles';


export default function Playground() {
  const { container, moreDistance } = useStyles();

  return <div className={ container }>
    <FloatingButton
      color="primary" aria-label="floating stuff"
      onClick={ () => console.log('FAB clicked') }
      className={ moreDistance }
    >
      i float
    </FloatingButton>
  </div>;
}
