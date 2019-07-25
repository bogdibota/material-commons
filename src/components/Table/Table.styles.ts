import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) => createStyles({
  pagination: {
    display: 'flex',
    justifyContent: 'left',
  },
  actionsCol: {
    width: theme.spacing(7),
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
  },
  actionsButton: {
    float: 'right',
    // padding: 0,
  },
});
