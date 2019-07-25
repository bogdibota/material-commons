import React, { forwardRef } from 'react';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

export const SlideUp = forwardRef((props, ref) =>
  <Slide direction="up" { ...props } ref={ ref }/>,
) as React.ComponentType<TransitionProps>;
