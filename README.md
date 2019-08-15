## dvkiin/material-commons

This package is an extension for `material-ui` including, but not limited to, 
a declarative 'form' and 'table' component.

[![NPM](https://img.shields.io/npm/v/@dvkiin/material-commons.svg)](https://www.npmjs.com/package/@dvkiin/material-commons) 
[![Build Status](https://travis-ci.com/bogdibota/material-commons.svg?branch=master)](https://travis-ci.com/bogdibota/material-commons)

### Instalation
```yarn add @dvkiin/material-commons```

or

```npm i @dvkiin/material-commons --save```

### `DVKForm` fields support 

   * [x] `text`
   * [x] `number`
   * [x] `email`
   * [x] `password`
   * [x] `select`
   * [x] `list` (array of any objects also defined by `fields`)
   * [x] `date` (using [@material-ui/pickers](https://github.com/mui-org/material-ui-pickers))
   * [x] `time` (using [@material-ui/pickers](https://github.com/mui-org/material-ui-pickers))
   * [x] `date-time` (using [@material-ui/pickers](https://github.com/mui-org/material-ui-pickers))
   * [x] `image`

### `DVKTable` fields support 

  - [x] `text` (default if not specified otherwise)
  - [x] `number`
  - [ ] `date`
  - [ ] `time`
  - [ ] `date-time`
  - [x] `imageBase64`
 
### Current modals support 

 - `InputModal` (contains a form)
 - `ErrorModal`
 - `ConfirmationModal`
 - `SuccessSnackbar`
 
### Other provided components

 - `FloatingButton` - a FAB that actually floats
