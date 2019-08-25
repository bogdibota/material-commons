import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: 400,
  },
  pre: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  moreDistance: {
    '&.override': {
      right: 100,
    },
  },
  verticalCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  gutterRight: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
