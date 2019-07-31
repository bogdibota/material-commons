import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloneIcon from '@material-ui/icons/FileCopy';
import { ComponentType } from 'react';

export type DVKAction = {
  name: string,
  label?: string,
  Icon?: ComponentType,
  onClick?: DVKActionCB
}

export type DVKActionCB = (obj: any) => void

export default function createDefaultActions({
                                               onEdit = () => null,
                                               onClone,
                                               onDelete = () => null,
                                             }: {
  onEdit?: DVKActionCB,
  onClone?: DVKActionCB,
  onDelete?: DVKActionCB
}): DVKAction[] {
  return [
    onEdit && { name: 'edit', label: 'View & Edit', Icon: EditIcon, onClick: onEdit },
    onClone && { name: 'clone', label: 'Clone', Icon: CloneIcon, onClick: onClone },
    { name: 'divider' },
    onDelete && { name: 'delete', label: 'Delete', Icon: DeleteIcon, color: 'red', onClick: onDelete },
  ]
    .filter(it => !!it) as DVKAction[];
}
