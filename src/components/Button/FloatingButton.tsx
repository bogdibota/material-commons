import React, { FC } from 'react';
import { Fab, withStyles } from '@material-ui/core';

import styles from './FloatingButton.styles';

export type FloatingButtonProps = {
  onClick: () => any,
  classes: any,
}

const FloatingButton: FC<FloatingButtonProps> = (({
                                                    onClick,
                                                    classes,
                                                    children,
                                                    ...props
                                                  }) => (
  <Fab { ...props } onClick={ onClick } className={ classes.absolute }>
    { children }
  </Fab>
));

export default withStyles(styles)(FloatingButton);
