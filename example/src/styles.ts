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
  bigCard: {
    width: 'auto',
  },
  pre: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  moreDistance: {
    right: 100,
  },
  verticalCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  gutterRight: {
    marginRight: theme.spacing(1),
  },
  leftForm: {
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
