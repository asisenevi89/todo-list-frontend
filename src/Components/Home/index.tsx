import React, { useState, useEffect, memo, MouseEvent} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _startCase from 'lodash/startCase';
import {
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Stack,
  IconButton,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditNoteOutlined';
import PendingIcon from '@mui/icons-material/PendingActions';
import DoneIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';
import { initFetchTodoList } from '../../ActionCreators/Todo';
import { makeTodoListData, makeTodoListLoading } from '../../Selectors';
import Spinner from '../Common/Spinner';
import AddTodoModal from './partials/AddTodoModal';
import { TodoType, TodoTypeKeyMap } from '../../Utils/CustomTypes';
import { STATUS_DONE } from '../../Utils/Constants';
import './styles.scss';

const defaultPage = 0;
const pageSize = 10;
const dataColumns = ['id', 'title', 'status'];
const tableColumns = [...dataColumns, 'actions'];

const Home = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [editTodo, setEditTodo] = useState<TodoType | null>(null);
  const [addModalStatus, setAddModalStatus] = useState(false);

  const todoData = useSelector(makeTodoListData);
  const isFetching = useSelector(makeTodoListLoading);
  const { total, data: todoList } = todoData;

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = (page?: number) => {
    const targetPage = page ? page : currentPage;
    const offset = targetPage * pageSize;
    dispatch(initFetchTodoList(pageSize, offset));
  };

  const onPaginationChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };

  const onAddModalClose = () => {
    setAddModalStatus(false);
    setEditTodo(null);
  };

  const getCellValue = (key: string, todo: TodoType) => {
    const itemKey = key as keyof TodoTypeKeyMap;
    const value = todo[itemKey];

    if (key !== 'status') return value;

    return (
      <Chip
        sx={{ minWidth: '100px'}}
        label={_startCase(value.toString())}
        variant='outlined'
        color={value === STATUS_DONE ? 'success' : 'warning'}
        icon={value === STATUS_DONE ? <DoneIcon /> : <PendingIcon />}
      />
    );
  };

  const getTableBody = () => {
    if (!todoList.length) {
      return <div>No Data</div>
    }

    return todoList.map((todo: TodoType) => (
      <TableRow hover role="checkbox" tabIndex={-1} key={todo.id}>
        {Object.keys(todo).map(key => {
          return (
            <TableCell key={`cell_data_${todo.id}_${key}`}>
              {getCellValue(key, todo)}
            </TableCell>
          )
        })}
        <TableCell>
          <Stack direction="row" spacing={1}>
            <IconButton title="Delete Todo" color="error">
              <DeleteIcon />
            </IconButton>
            <IconButton title="Edit Todo" color="primary">
              <EditIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Spinner backdropProps={{ open: isFetching}}>
      <Grid className='home-container'>
        <div className='header-row'>
          <Typography variant='h4'>
            Todo List
          </Typography>
          <Button 
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => setAddModalStatus(true)}
            >
              Add
          </Button>
        </div>
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {tableColumns.map((item: string) =>  (
                    <TableCell key={item} align='left'>
                      {_startCase(item)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {getTableBody()}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={total}
              rowsPerPage={pageSize}
              page={currentPage}
              onPageChange={onPaginationChange}
            />
          </TableContainer>
        </Paper>
      </Grid>
      <AddTodoModal 
        modalStatus={addModalStatus}
        editTodo={editTodo}
        onModalClose={onAddModalClose}
      />
    </Spinner>
    
  );
}

export default memo(Home);
