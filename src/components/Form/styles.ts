import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  expansionPanelContent: {
    overflow: 'hidden',
  },
  expansionPanelTable: {
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
  },
  expansionPanelNoContent: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  expansionPanelHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansionPanelButtonsWrapper: {
    marginTop: theme.spacing(1),
  },
  iconLeft: {
    marginRight: theme.spacing(1),
  },
  thumbnail: {
    maxWidth: 75,
    maxHeight: 75,
    marginBottom: theme.spacing(.5),
  },
  thumbnailWrapper: {
    maxHeight: 'initial',
    height: 'initial',
  },
}));
