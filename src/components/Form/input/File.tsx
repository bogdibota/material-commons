import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { ChangeEvent, FC, useContext, useState } from 'react';

import { deepGet } from '../../../lib';

import FormContext from '../context';
import { DVKFileField, PropsWithErrorManagement } from '../domain';
import useStyles from '../styles';

const InputFile: FC<DVKFileField & PropsWithErrorManagement> = ({
                                                                  name, label, type,

                                                                  required = false,
                                                                  disabled = false,
                                                                  acceptedFileType,
                                                                  multiple,
                                                                  hasError,
                                                                  message,
                                                                }) => {
  const { obj, updateProperty } = useContext(FormContext);
  const classes = useStyles();
  const [selectedFileName, setSelectedFileName] = useState(deepGet(obj, `${ name }.fileName`, ''));

  function onFileSelected({ target: { files } }: ChangeEvent<HTMLInputElement>) {
    if (!files) return;
    const listFiles = Array.from(files);
    let fileName = listFiles.map((file) => file.name).join();
    setSelectedFileName(fileName);
    updateProperty(name, type)(listFiles);
  }

  function clearField(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    setSelectedFileName('');
    updateProperty(name, type)(null);
  }

  return <>
    <input
      accept={ acceptedFileType }
      style={ { display: 'none' } }
      id={ `${ name }-hidden` }
      type="file"
      onChange={ onFileSelected }
      multiple={ multiple }
    />
    <label htmlFor={ `${ name }-hidden` }>
      <FormControl fullWidth margin="dense">
        <InputLabel htmlFor={ name } error={ hasError }>{ label }</InputLabel>
        <Input
          id={ name }
          type="text"
          disabled={ disabled }
          required={ required }


          value={ selectedFileName }

          endAdornment={ <InputAdornment position="end">
            <Button component="span">
              <AttachFileIcon className={ classes.iconLeft }/>
              Attach
            </Button>
            { selectedFileName && <IconButton aria-label="Remove selected files" onClick={ clearField }>
              <DeleteIcon/>
            </IconButton> }
          </InputAdornment> }
          inputProps={ {
            disabled: true,
          } }

          error={ hasError }
          aria-describedby={ `${ name }-helper` }
        />
        { hasError && <FormHelperText id={ `${ name }-helper` } error>{ message }</FormHelperText> }
      </FormControl>
    </label>
  </>;
};

export default InputFile;
