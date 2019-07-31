import React, { Component, ComponentType, forwardRef, ForwardRefExoticComponent, Ref } from 'react';
import { Table, withStyles } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/MoreVert';

import { deepGet } from '../../lib';

import styles from './Table.styles';
import { DVKAction } from './defaultActions';
import { DVKColumn, DVKPagination } from './domain';

export type MenuActionProps = {
  name: string, label?: string, color?: string,
  onClick?: (target?: Element) => void,
  actionTarget?: Element,
  closeActionsMenu?: () => void,
  Icon?: ComponentType
}

const MenuAction: ForwardRefExoticComponent<MenuActionProps> = forwardRef(({name, label, color, onClick, actionTarget, closeActionsMenu, Icon}, ref: Ref<HTMLLIElement>) => {
  if (name === 'divider') return <Divider/>;
  if (!onClick || !closeActionsMenu || !Icon) return null;

  return <MenuItem
    ref={ ref }
    style={ {color: color || 'default'} }
    onClick={ () => {
      onClick(actionTarget);
      closeActionsMenu();
    } }
  >
    <ListItemIcon>
      <Icon/>
    </ListItemIcon>
    <ListItemText primary={ label }/>
  </MenuItem>;
});

export type DVKTableProps = {
  // ...DVKPagination
  page?: number,
  rowsPerPage?: number,
  order?: 'desc' | 'asc',
  orderBy?: string,

  total?: number,
  className?: string,
  actions?: DVKAction[],
  rows: any[],
  columns: DVKColumn[],

  onRowClick?: (row: any) => void,
  onUpdatePagination?: (pagination: DVKPagination) => void,

  classes: any,
}

type DVKTableState = {
  actionsMenuAnchor?: Element,
  actionTarget?: Element,
}

class DVKTable extends Component<DVKTableProps, DVKTableState> {
  static defaultProps: DVKTableProps;

  state = {
    actionsMenuAnchor: undefined,
    actionTarget: undefined,
  };

  createSortHandler = (property: string) => () => {
    this.handleSort(property);
  };

  handleSort = (property: string) => {
    const {orderBy, order, rowsPerPage, onUpdatePagination} = this.props;
    if (!onUpdatePagination || !rowsPerPage) return;
    const sort = orderBy === property && order === 'asc' ? 'desc' : 'asc';
    onUpdatePagination({page: 0, rowsPerPage, order: sort, orderBy: property});
  };

  handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    const {orderBy, order, rowsPerPage, onUpdatePagination} = this.props;
    if (!onUpdatePagination || !rowsPerPage || !orderBy || !order) return;
    onUpdatePagination({page, rowsPerPage, orderBy, order});
  };

  closeActionsMenu = () => this.setState({actionsMenuAnchor: undefined, actionTarget: undefined});

  renderTable() {
    const {
      classes, className, rows, columns, onRowClick, actions,
      order, orderBy, rowsPerPage = 0, total, page = 0, // pagination; if `total` is falsy, no pagination is rendered; if `orderBy` is falsy, no sort is rendered
    } = this.props;
    const emptyRows = (total && (rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage))) || 0;

    return (
      <Table className={ className }>
        <TableHead>
          <TableRow>
            { columns.map(column => <TableCell
              key={ column.name }
              align={ column.numeric ? 'right' : 'left' }
              sortDirection={ orderBy === column.name ? order : false }>
              { orderBy ? <Tooltip
                  title="Sort"
                  placement={ column.numeric ? 'bottom-end' : 'bottom-start' }
                  enterDelay={ 300 }
                >
                  <TableSortLabel
                    active={ orderBy === column.name }
                    direction={ order }
                    onClick={ this.createSortHandler(column.name) }
                  >
                    { column.label }
                  </TableSortLabel>
                </Tooltip>
                : <>{ column.label }</> }
            </TableCell>) }
            { actions && <TableCell className={ classes.actionsCol }/> }
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map(row => (
            <TableRow
              key={ row.id || row.syntheticId }
              hover={ !!onRowClick }
              style={ {cursor: onRowClick ? 'pointer' : 'inherit'} }
              onClick={ () => onRowClick && onRowClick(row) }>
              { columns.map(column => <TableCell key={ column.name }
                                                 align={ column.numeric ? 'right' : 'left' }>
                { deepGet(row, column.name) }
              </TableCell>) }
              { actions && (
                <TableCell className={ classes.actionsCol }>
                  <IconButton
                    className={ classes.actionsButton }
                    aria-controls="actions-menu"
                    aria-haspopup="true"
                    onClick={ (event) => {
                      event.stopPropagation();
                      this.setState({
                        actionsMenuAnchor: event.currentTarget,
                        actionTarget: row,
                      });
                    } }
                  >
                    <MenuIcon/>
                  </IconButton>
                </TableCell>
              ) }
            </TableRow>
          )) }
          { emptyRows > 0 && (
            <TableRow style={ {height: 48 * emptyRows} }>
              <TableCell colSpan={ columns.length + (actions ? 1 : 0) }/>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    );
  }

  renderPagination() {
    const {rowsPerPage, total, page, classes} = this.props;
    if (!total || !rowsPerPage || !page) return;
    return (
      <TablePagination
        component="div"
        backIconButtonProps={ {'aria-label': 'Previous Page'} }
        nextIconButtonProps={ {'aria-label': 'Next Page'} }

        rowsPerPageOptions={ [rowsPerPage] }
        count={ total }
        rowsPerPage={ rowsPerPage }
        page={ page }

        onChangePage={ this.handleChangePage }
        classes={ {root: classes.pagination} }
      />
    );
  }

  render() {
    const {actionsMenuAnchor, actionTarget} = this.state;
    const {total, actions} = this.props;

    return <>
      { this.renderTable() }
      { total && this.renderPagination() }
      { actions && <Menu
        id="actions-menu"
        anchorEl={ actionsMenuAnchor }
        keepMounted
        open={ !!actionsMenuAnchor }
        onClose={ this.closeActionsMenu }
      >
        { actions.map(action => <MenuAction
          { ...action }
          key={ action.name } // this will fail if you have multiple dividers; will find solution when this is a problem
          closeActionsMenu={ this.closeActionsMenu }
          actionTarget={ actionTarget }
        />) }
      </Menu> }
    </>;
  }
}

export default withStyles(styles)(DVKTable);
