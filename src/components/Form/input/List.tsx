import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { FunctionComponent, useContext, useMemo } from 'react';

import { deepGet, useIncrementalKey, useModal, uuid } from '../../../lib';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import { FlexExpander } from '../../placeholders';
import DVKTable from '../../Table';
import createDefaultActions from '../../Table/defaultActions';
import { DVKColumn } from '../../Table/domain';

import FormContext from '../context';
import { DVKListField, DVKListItem, isHiddenField } from '../domain';
import useStyles from '../styles';

const InputList: FunctionComponent<DVKListField> = ({
                                                      name,
                                                      label,

                                                      editLabel = ({ id }) => `Edit '${ id }'`,
                                                      deleteLabel = ({ id }) => `Delete '${ id }'`,
                                                      deleteMessage = () => '',
                                                      fields,

                                                      InputModal,
                                                    }) => {
  const { obj, updatePropertyF } = useContext(FormContext);
  const classes = useStyles();
  const { isOpen: isAddModalOpen, open: openAddModal, close: closeAddModal } = useModal();
  const { isOpen: isEditModalOpen, data: editModalData = {}, open: openEditModal, close: closeEditModal } = useModal<any>();
  const { isOpen: isDeleteModalOpen, data: deleteModalData = {}, open: openDeleteModal, close: closeDeleteModal } = useModal<any>();
  const [createKey, incrementCreateKey] = useIncrementalKey();

  const values = useMemo(() => deepGet(obj, name), [obj, name]);
  const actions = useMemo(() => createDefaultActions({
    onEdit: openEditModal,
    onDelete: openDeleteModal,
  }), [openEditModal, openDeleteModal]);

  function isEqual(val1: DVKListItem, val2: DVKListItem) {
    return (val1.id && val1.id === val2.id) || (val1.syntheticId && val1.syntheticId === val2.syntheticId);
  }

  return <ExpansionPanel defaultExpanded>
    <ExpansionPanelSummary
      expandIcon={ <ExpandMoreIcon/> }
      aria-controls={ `${ name }-content` }
      id={ `${ name }-header` }
    >
      <Typography className={ classes.expansionPanelHeading }>{ label }</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={ classes.expansionPanelContent }>
      <Grid container direction="column">
        <Grid item className={ classes.expansionPanelTable }>
          { values.length
            ? <DVKTable
              // cast is safe because we checked it before
              columns={ fields.filter(field => !isHiddenField(field)) as DVKColumn[] }
              actions={ actions }
              rows={ values }
              onRowClick={ openEditModal }
            />
            : <Typography key={ name } className={ classes.expansionPanelNoContent }>
              No { label.toLowerCase() }. Please add some.
            </Typography>
          }
        </Grid>
        <Grid item container className={ classes.expansionPanelButtonsWrapper }>
          <FlexExpander/>
          <Button onClick={ openAddModal }>
            Add
          </Button>
        </Grid>
      </Grid>
    </ExpansionPanelDetails>
    <InputModal
      title={ `Add new ${ name }` }
      formKey={ createKey }
      open={ isAddModalOpen }
      fields={ fields }
      onClose={ closeAddModal }
      onCreate={ (newValue: DVKListItem) => {
        updatePropertyF(name, (oldValues) => [...(oldValues as DVKListItem[]), { ...newValue, syntheticId: uuid() }]);
        incrementCreateKey();
      } }
    />
    <InputModal
      title={ editLabel(editModalData) }
      formKey={ editModalData.id || editModalData.syntheticId }
      open={ isEditModalOpen }
      fields={ fields }
      defaultValue={ editModalData }
      saveLabel="Save"
      onClose={ closeEditModal }
      onCreate={ (newValue: DVKListItem) => {
        updatePropertyF(name, (oldValues) => (oldValues as DVKListItem[])
          .map(value => isEqual(value, newValue) ? newValue : value),
        );
        closeEditModal();
      } }
    />
    <ConfirmationModal
      title={ deleteLabel(deleteModalData) }
      message={ deleteMessage(deleteModalData) }
      open={ isDeleteModalOpen }
      onCancel={ closeDeleteModal }
      onAccept={ () => {
        updatePropertyF(name, (oldValues) => (oldValues as DVKListItem[])
          .filter(value => !isEqual(value, deleteModalData)),
        );
        closeDeleteModal();
      } }
    />
  </ExpansionPanel>;
};

export default InputList;
