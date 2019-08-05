import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { FunctionComponent, useContext } from 'react';

import { deepGet, useIncrementalKey, useModal, uuid } from '../../lib';
import ConfirmationModal from '../Modals/ConfirmationModal';

import { FlexExpander } from '../placeholders';
import DVKTable from '../Table';
import createDefaultActions from '../Table/defaultActions';

import FormContext from './context';
import { DVKField, DVKListItem } from './domain';
import useStyles from './styles';

export type InputListProps = {
  name: string, label: string

  fields: DVKField[],
  editLabel: (value: any) => string,
  deleteLabel: (value: any) => string,
  deleteMessage: (value: any) => string,

  InputModal: any
}


const InputList: FunctionComponent<InputListProps> = ({
                                                        name, label, editLabel, deleteLabel, deleteMessage, fields,
                                                        InputModal,
                                                      }) => {
  const { obj, updatePropertyF } = useContext(FormContext);
  const classes = useStyles();
  const { open: addModalOpen, show: showAddModal, close: closeAddModal } = useModal();
  const { open: editModalOpen, data: editModalData = {}, show: showEditModal, close: closeEditModal } = useModal<any>();
  const { open: deleteModalOpen, data: deleteModalData = {}, show: showDeleteModal, close: closeDeleteModal } = useModal<any>();
  const [ createKey, incrementCreateKey ] = useIncrementalKey();

  const values = deepGet(obj, name); // memo?
  const actions = createDefaultActions({ onEdit: showEditModal, onDelete: showDeleteModal });// memo?

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
              columns={ fields }
              actions={ actions }
              rows={ values }
              onRowClick={ showEditModal }
            />
            : <Typography key={ name } className={ classes.expansionPanelNoContent }>
              No { label.toLowerCase() }. Please add some.
            </Typography>
          }
        </Grid>
        <Grid item container className={ classes.expansionPanelButtonsWrapper }>
          <FlexExpander/>
          <Button onClick={ showAddModal }>
            Add
          </Button>
        </Grid>
      </Grid>
    </ExpansionPanelDetails>
    <InputModal
      title={ `Add new ${ name }` }
      formKey={ createKey }
      open={ addModalOpen }
      fields={ fields }
      onClose={ closeAddModal }
      onCreate={ (newValue: DVKListItem) => {
        updatePropertyF(name, (oldValues) => [ ...(oldValues as DVKListItem[]), { ...newValue, syntheticId: uuid() } ]);
        incrementCreateKey();
      } }
    />
    <InputModal
      title={ editLabel(editModalData) }
      formKey={ editModalData.id || editModalData.syntheticId }
      open={ editModalOpen }
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
      open={ deleteModalOpen }
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
