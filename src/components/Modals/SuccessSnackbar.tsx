import Snackbar from '@material-ui/core/Snackbar';
import React, { Component, ReactNode } from 'react';

export type SuccessSnackbarProps = {
  message: string,
  action?: ReactNode
}

class SuccessSnackbar extends Component<SuccessSnackbarProps> {
  state = { open: true };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      open,
    } = this.state;
    const {
      message,
      action,
    } = this.props;

    return <Snackbar
      open={ open }
      onClose={ this.handleClose }
      message={ message }
      action={ action }
    />;
  }
}

export default SuccessSnackbar;
