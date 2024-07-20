import React, { memo, useState, useEffect, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
} from '@mui/material';
import { TodoAddType, TodoType } from '../../../Utils/CustomTypes';
import { STATUS_PENDING } from '../../../Utils/Constants';

type AddModalPropType = {
  modalStatus: boolean,
  onModalClose: () => void,
  editTodo: TodoType | null,
  onSaveTodo?: (data: TodoAddType) => void,
  onUpdateData?: (data: TodoType) => void,
};

const AddTodoModal = ({
  modalStatus,
  onModalClose,
  editTodo,
}: AddModalPropType) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(STATUS_PENDING);

  useEffect(() => {
    if (!editTodo) return;

    setTitle(editTodo.title);
    setStatus(editTodo.status);
  }, [editTodo]);

  const handleClose = () => {
    setTitle('');
    setStatus(STATUS_PENDING);
    onModalClose();
  };

  const titleChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  return (
    <Dialog
      open={modalStatus}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        Add New Todo
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ m: 1 }}>
          <FormControl sx={{ width: '400px'}}>
            <InputLabel htmlFor="todo-title">Title</InputLabel>
            <OutlinedInput
              id="todo-title"
              label="Title"
              required
              value={title}
              onChange={titleChanged}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='contained' color='inherit'>Close</Button>
        <Button 
          onClick={handleClose}
          variant='contained'
          color='primary'
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AddTodoModal);