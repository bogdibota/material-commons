import { CssBaseline } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Playground';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import 'moment/locale/en-gb';

ReactDOM.render(<>
  <MuiPickersUtilsProvider utils={ MomentUtils } locale="en-gb">
    <CssBaseline/>
    <App/>
  </MuiPickersUtilsProvider>
</>, document.getElementById('root'));
