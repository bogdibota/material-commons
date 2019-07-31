import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import React, { forwardRef } from 'react';

export const SlideUp = forwardRef((props, ref) =>
  <Slide direction="up" { ...props } ref={ ref }/>,
) as React.ComponentType<TransitionProps>;
