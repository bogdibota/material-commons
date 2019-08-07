## dvkiin/material-commons

This package is an extension for `material-ui` including, but not limited to, 
a declarative 'form' and 'table' component.

[![NPM](https://img.shields.io/npm/v/@dvkiin/material-commons.svg)](https://www.npmjs.com/package/@dvkiin/material-commons) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Instalation
```yarn add @dvkiin/material-commons```

or

```npm i @dvkiin/material-commons --save```

### Current `DVKForm` fields support 

 - `text`
 - `number`
 - `email`
 - `password`
 - `select`
 - `list` (array of any objects also defined by `fields`)
 - `date` (using [@material-ui/pickers](https://github.com/mui-org/material-ui-pickers))
 - `time` (using [@material-ui/pickers](https://github.com/mui-org/material-ui-pickers))
 - `date-time` (using [@material-ui/pickers](https://github.com/mui-org/material-ui-pickers))

### Current `DVKTable` fields support 

 - `text`
 - `numeric`
 
### Current modals support 

 - `InputModal` (contains a form)
 - `ErrorModal`
 - `ConfirmationModal`
 - `SuccessSnackbar`
 
### Other provided components

 - `FloatingButton` - a FAB that actually floats
