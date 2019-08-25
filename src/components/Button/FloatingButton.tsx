import { Fab, makeStyles } from '@material-ui/core';
import { FabProps } from '@material-ui/core/Fab';
import clsx from 'clsx';
import React, { FC } from 'react';

const useStyles = makeStyles({
  fixed: {
    position: 'fixed',
    right: '10px',
    bottom: '10px',
  },
}, { name: 'fab' });

const FloatingButton: FC<FabProps> = (({
                                         onClick,
                                         children,
                                         className,
                                         ...props
                                       }) => {
  const { fixed } = useStyles();
  return (
    <Fab { ...props } onClick={ onClick } className={ clsx(className, fixed) }>
      { children }
    </Fab>
  );
});

export default FloatingButton;
