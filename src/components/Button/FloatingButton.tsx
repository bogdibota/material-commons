import { Fab, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';

const useStyles = makeStyles({
  fixed: {
    position: 'fixed',
    right: '10px',
    bottom: '10px',
  },
}, { name: 'fab' });


export type FloatingButtonProps = {
  onClick: () => any,
  className?: string
}

const FloatingButton: FC<FloatingButtonProps> = (({
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
