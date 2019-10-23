import { Table, withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import React, { Component, ComponentType, forwardRef, ForwardRefExoticComponent, Ref } from 'react';

import { deepGet } from '../../lib';

import { DVKAction } from './defaultActions';
import { DVKColumn, DVKPagination, DVKSort } from './domain';
import styles from './Table.styles';

export type MenuActionProps = {
  name: string, label?: string, color?: string,
  onClick?: (target?: Element) => void,
  actionTarget?: Element,
  closeActionsMenu?: () => void,
  Icon?: ComponentType
}

const MenuAction: ForwardRefExoticComponent<MenuActionProps> = forwardRef((
  { name, label, color, onClick, actionTarget, closeActionsMenu, Icon },
  ref: Ref<HTMLLIElement>,
) => {
  if (name === 'divider') return <Divider/>;
  if (!onClick || !closeActionsMenu || !Icon) return null;

  return <MenuItem
    ref={ ref }
    style={ { color: color || 'default' } }
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
  pagination?: DVKPagination
  sort?: DVKSort | null
  onPaginationSortUpdate?: (pagination: DVKPagination | undefined, sort: DVKSort | null | undefined) => void,

  total?: number,
  className?: string,
  actions?: DVKAction[],
  rows: any[],
  columns: DVKColumn[],

  onRowClick?: (row: any) => void,

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
    const { onPaginationSortUpdate, sort, pagination } = this.props;
    if (!onPaginationSortUpdate) return;

    const { orderBy, order } = sort || { orderBy: '', order: '' };
    const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc';
    onPaginationSortUpdate(
      pagination ? { ...pagination, page: 0 } : undefined,
      { order: newOrder, orderBy: property },
    );
  };

  handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    const { onPaginationSortUpdate, sort, pagination } = this.props;
    if (!onPaginationSortUpdate || !pagination) return;

    onPaginationSortUpdate({ ...pagination, page }, sort);
  };

  closeActionsMenu = () => this.setState({ actionsMenuAnchor: undefined, actionTarget: undefined });

  renderCell(row: any, column: DVKColumn) {
    const { classes } = this.props;

    if (column.type === 'imageBase64') {
      const imgData = deepGet(row, column.name);

      return <TableCell key={ column.name } className={ clsx(classes.thumbnailWrapper, classes.thumbnailRowWrapper) }>
        { imgData && <img
          className={ classes.thumbnail }
          src={ imgData }
          alt={ `${ row.id }-${ column.name }` }
        /> }
      </TableCell>;
    }

    const value = deepGet(row, column.name);

    return <TableCell key={ column.name } align={ column.type === 'number' ? 'right' : 'left' }>
      { column.project ? column.project(value) : value }
    </TableCell>;
  }

  renderActions(row: any) {
    const { classes } = this.props;

    return <TableCell className={ classes.actionsCol }>
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
    </TableCell>;
  }

  renderTable() {
    const {
      classes, className, rows, columns, onRowClick, actions,
      pagination, sort, total,
    } = this.props;
    const emptyRows = (pagination && total && (pagination.rowsPerPage - Math.min(pagination.rowsPerPage, total - pagination.page * pagination.rowsPerPage))) || 0;

    return (
      <Table className={ className }>
        <TableHead>
          <TableRow>
            { columns.map(column => <TableCell
              key={ column.name }
              align={ column.type === 'number' ? 'right' : 'left' }
              sortDirection={ sort && sort.orderBy === column.name ? sort.order : false }>
              { (sort !== undefined) && !column.noSort ? <Tooltip
                  title="Sort"
                  placement={ column.type === 'number' ? 'bottom-end' : 'bottom-start' }
                  enterDelay={ 300 }
                >
                  <TableSortLabel
                    active={ (sort && sort.orderBy === column.name) || undefined }
                    direction={ (sort && sort.order) || undefined }
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
              style={ { cursor: onRowClick ? 'pointer' : 'inherit' } }
              onClick={ () => onRowClick && onRowClick(row) }>

              { columns.map(column => this.renderCell(row, column)) }

              { actions && this.renderActions(row) }
            </TableRow>
          )) }
          { emptyRows > 0 && (
            <TableRow style={ { height: 48 * emptyRows } }>
              <TableCell colSpan={ columns.length + (actions ? 1 : 0) }/>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    );
  }

  renderPagination() {
    const { pagination, total, classes } = this.props;
    if (!total || !pagination) return;
    const { rowsPerPage, page } = pagination;

    return (
      <TablePagination
        component="div"
        backIconButtonProps={ { 'aria-label': 'Previous Page' } }
        nextIconButtonProps={ { 'aria-label': 'Next Page' } }

        rowsPerPageOptions={ [rowsPerPage] }
        count={ total }
        rowsPerPage={ rowsPerPage }
        page={ page! }

        onChangePage={ this.handleChangePage }
        classes={ { root: classes.pagination } }
      />
    );
  }

  render() {
    const { actionsMenuAnchor, actionTarget } = this.state;
    const { total, actions } = this.props;

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
