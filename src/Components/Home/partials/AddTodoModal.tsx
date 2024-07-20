import React, { memo, useState, useEffect, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Box,
  RadioGroup,
  Radio,
} from '@mui/material';
import _startCase from 'lodash/startCase';
import { TodoAddType, TodoType } from '../../../Utils/CustomTypes';
import { STATUS_PENDING, STATUS_DONE } from '../../../Utils/Constants';

type AddModalPropType = {
  modalStatus: boolean,
  onModalClose: () => void,
  editTodo: TodoType | null,
  onCreateTodo: (data: TodoAddType) => void,
  onUpdateTodo: (data: TodoType) => void,
};

const AddTodoModal = ({
  modalStatus,
  onModalClose,
  editTodo,
  onCreateTodo,
  onUpdateTodo,
}: AddModalPropType) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(STATUS_PENDING);
  const [titleError, setTitleError] = useState('');

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
    validate(value);
  };

  const statusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setStatus(value);
  };

  const validate = (title: string) => {
    if (!title) {
      setTitleError('Title cannot be empty.');
      return true;
    }
    setTitleError('');
    return false;
  };

  const onSave = () => {
    const hasError = validate(title);

    if (hasError) return;

    if (!editTodo) {
      onCreateTodo({ title, status });
      handleClose();
      return;
    }

    const updateData = {
      ...editTodo,
      title,
      status,
    };
    onUpdateTodo(updateData);
    handleClose();
  };

  return (
    <Dialog
      open={modalStatus}
      onClose={handleClose}
      aria-labelledby="add-modal-title"
      className='add-todo-modal'
    >
      <DialogTitle id="add-modal-title" className='modal-title'>
        Add New Todo
      </DialogTitle>
      <DialogContent className='modal-content'>
        <Box component="form" sx={{ m: 1 }}>
          <FormControl 
            fullWidth 
            error={!!titleError} 
            className='title-wrapper'
            >
            <InputLabel htmlFor="todo-title">Title</InputLabel>
            <OutlinedInput
              id="todo-title"
              label="Title"
              required
              value={title}
              onChange={titleChanged}
            />
            {titleError && <FormHelperText>{titleError}</FormHelperText>} 
          </FormControl>
          <FormControl fullWidth className='radio-group-wrapper'>
            <FormLabel id="todo-radio-status">Todo Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="todo-radio-status"
              name="status-radio-group"
              value={status}
              onChange={statusChanged}
            >
              <FormControlLabel
                value={STATUS_PENDING}
                control={<Radio />} 
                label={_startCase(STATUS_PENDING)}
              />
              <FormControlLabel 
                value={STATUS_DONE} 
                control={<Radio />}
                label={_startCase(STATUS_DONE)} 
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions className='modal-footer'>
        <Button onClick={handleClose} variant='contained' color='inherit'>
          Close
        </Button>
        <Button 
          onClick={onSave}
          variant='contained'
          color='primary'
          autoFocus
          disabled={!!titleError}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AddTodoModal);