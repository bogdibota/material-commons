import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import DefaultThumbnail from '@material-ui/icons/AddPhotoAlternate';
import DeleteIcon from '@material-ui/icons/Delete';
import BrowseImage from '@material-ui/icons/ImageSearch';
import React, { ChangeEvent, FC, useContext, useEffect, useMemo, useState } from 'react';

import { deepGet } from '../../../lib';

import FormContext from '../context';
import { DVKImageField, PropsWithErrorManagement } from '../domain';
import useStyles from '../styles';

const InputImage: FC<DVKImageField & PropsWithErrorManagement> = ({
                                                                    name, label, type,

                                                                    autoFocus = false,
                                                                    required = false,
                                                                    disabled = false,

                                                                    hasError,
                                                                    message,
                                                                  }) => {
  const { obj, updateProperty } = useContext(FormContext);
  const classes = useStyles();
  const [selectedFileName, setSelectedFileName] = useState(deepGet(obj, `${ name }.fileName`, ''));
  const [thumbnail, setThumbnail] = useState(deepGet(obj, `${ name }.thumbnail`, undefined));
  const fileReader = useMemo(() => new FileReader(), []);

  useEffect(() => {
    fileReader.onload = function () {
      setThumbnail(fileReader.result);
    };
  }, [fileReader]);

  function onFileSelected({ target: { files } }: ChangeEvent<HTMLInputElement>) {
    if (!files || !files[0]) return;
    const file = files[0];

    setSelectedFileName(file.name);
    fileReader.readAsDataURL(file);
    updateProperty(name, type)(file);
  }

  function clearField(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    setSelectedFileName('');
    setThumbnail(undefined);
    updateProperty(name, type)(null);
  }

  return <>
    <input
      accept="image/*"
      style={ { display: 'none' } }
      id={ `${ name }-hidden` }
      type="file"
      onChange={ onFileSelected }
    />
    <label htmlFor={ `${ name }-hidden` }>
      <FormControl fullWidth margin="dense">
        <InputLabel htmlFor={ name } error={ hasError }>{ label }</InputLabel>
        <Input
          id={ name }
          type="text"
          disabled={ disabled }
          autoFocus={ autoFocus }
          required={ required }

          value={ selectedFileName }

          startAdornment={ <InputAdornment position="start" className={ classes.thumbnailWrapper }>
            { thumbnail
              ? <img src={ thumbnail } alt={ `${ name }-thumbnail` } className={ classes.thumbnail }/>
              : <DefaultThumbnail fontSize="large"/>
            }
          </InputAdornment> }
          endAdornment={ <InputAdornment position="end">
            <Button component="span">
              <BrowseImage className={ classes.iconLeft }/>
              Browse
            </Button>
            { selectedFileName && <IconButton aria-label="Remove selected image" onClick={ clearField }>
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

export default InputImage;
