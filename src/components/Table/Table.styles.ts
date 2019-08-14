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
  },
  thumbnail: {
    maxWidth: 60,
    maxHeight: 60,
  },
  thumbnailWrapper: {
    width: 1,
    paddingRight: theme.spacing(2),
    textAlign: 'center',
  },
  thumbnailRowWrapper: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    lineHeight: 0,
  },
});
