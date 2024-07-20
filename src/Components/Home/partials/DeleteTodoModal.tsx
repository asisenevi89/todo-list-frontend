import React, { memo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
import _startCase from 'lodash/startCase';
import { TodoType } from '../../../Utils/CustomTypes';

type DeleteModalPropType = {
  modalStatus: boolean,
  onModalClose: () => void,
  selectedTodo: TodoType | null,
  onDeleteTodo: (id: number) => void,
};

const DeleteTodoModal = ({
  modalStatus,
  onModalClose,
  selectedTodo,
  onDeleteTodo,
}: DeleteModalPropType) => {

  const handleClose = () => {
    onModalClose();
  };

  const onDelete = () => {
    if (!selectedTodo) return;
    onDeleteTodo(selectedTodo.id);
    handleClose();
  };

  return (
    <Dialog
      open={modalStatus}
      onClose={handleClose}
      aria-labelledby="delete-modal-title"
      className='delete-todo-modal'
    >
      <DialogTitle id="add-modal-title" className='modal-title'>
        Delete Todo !
      </DialogTitle>
      <DialogContent className='modal-content'>
        <DialogContentText id="modal-message">
          Are you sure you want to delete: <strong>{selectedTodo?.title}</strong>
          &nbsp;
          todo?
        </DialogContentText>
      </DialogContent>
      <DialogActions className='modal-footer'>
        <Button onClick={handleClose} variant='contained' color='inherit'>
          Cancel
        </Button>
        <Button 
          onClick={onDelete}
          variant='contained'
          color='error'
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(DeleteTodoModal);
