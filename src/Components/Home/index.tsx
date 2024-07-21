import React, { 
  useState,
  useEffect,
  useCallback,
  memo,
  MouseEvent,
  ChangeEvent,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _startCase from 'lodash/startCase';
import _debounce from 'lodash/debounce';
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
  Input
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditNoteOutlined';
import PendingIcon from '@mui/icons-material/PendingActions';
import DoneIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
  initFetchTodoList,
  initCreateTodo,
  initUpdateTodo,
  initDeleteTodo,
} from '../../ActionCreators/Todo';
import { makeTodoListData, makeTodoListLoading } from '../../Selectors';
import { makeLastResponseState } from '../../Selectors/general';
import Spinner from '../Common/Spinner';
import AddTodoModal from './partials/AddTodoModal';
import DeleteTodoModal from './partials/DeleteTodoModal';
import TableNoData from './partials/TableNoData';
import Notification from './partials/Notification';
import { TodoAddType, TodoType, TodoTypeKeyMap } from '../../Utils/CustomTypes';
import { STATUS_DONE, DEFAULT_PAGE_SIZE, DEFAULT_OFFSET } from '../../Utils/Constants';
import './styles.scss';

const defaultPage = DEFAULT_OFFSET;
const pageSize = DEFAULT_PAGE_SIZE;
const dataColumns = ['id', 'title', 'status'];
const tableColumns = [...dataColumns, 'actions'];

const Home = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [todoSearch, setTodoSearch] = useState('');
  const [editTodo, setEditTodo] = useState<TodoType | null>(null);
  const [addModalStatus, setAddModalStatus] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState<TodoType | null>(null);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const todoData = useSelector(makeTodoListData);
  const isFetching = useSelector(makeTodoListLoading);
  const lastResponse = useSelector(makeLastResponseState);
  const { total, data: todoList } = todoData;

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = (page?: number) => {
    const targetPage = page !== undefined ? page : currentPage;
    const offset = targetPage * pageSize;
    dispatch(initFetchTodoList(pageSize, offset, todoSearch));
  };

  const onPaginationChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
    fetchTodoList(newPage);
  };

  const onAddModalClose = () => {
    setAddModalStatus(false);
    setEditTodo(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalStatus(false);
    setDeleteTodo(null);
  }

  const onEditClicked = (todo: TodoType) => {
    setEditTodo(todo);
    setAddModalStatus(true);
  };

  const onDeleteClicked = (todo: TodoType) => {
    setDeleteTodo(todo);
    setDeleteModalStatus(true);
  };

  const onSaveTodo = (data: TodoAddType) => {
    setTodoSearch('');
    setCurrentPage(defaultPage);
    dispatch(initCreateTodo(data));
  };

  const onDeleteTodo = (id: number) => {
    dispatch(initDeleteTodo(id));
  };

  const onEditTodo = (data: TodoType) => {
    const { id, ...updateData } = data;
    dispatch(initUpdateTodo(id, updateData));
  };

  const onTodoSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodoSearch(value);
    fetchTodoDebounce(value);
  };

  const fetchTodoDebounce = useCallback(
    _debounce(
      (value: string) => {
        setCurrentPage(0);
        dispatch(initFetchTodoList(pageSize, 0, value));
      },
      1000,
    ),
    [],
  );

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
      return <TableNoData />
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
            <IconButton 
              title="Delete Todo"
              color="error"
              onClick={() => onDeleteClicked(todo)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              title="Edit Todo"
              color="primary"
              onClick={() => onEditClicked(todo)}
            >
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
          <div>
            <Input
              startAdornment={<SearchIcon />}
              placeholder='Search Todo...'
              value={todoSearch}
              onChange={onTodoSearch}
            />
            <Button 
              variant='contained'
              startIcon={<AddIcon />}
              onClick={() => setAddModalStatus(true)}
              >
                Add
            </Button>
          </div>
         
        </div>
        <Paper>
          <TableContainer className='todo-table-container'>
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
        onCreateTodo={onSaveTodo}
        onUpdateTodo={onEditTodo}
      />
      <DeleteTodoModal
        modalStatus={deleteModalStatus}
        selectedTodo={deleteTodo}
        onDeleteTodo={onDeleteTodo}
        onModalClose={closeDeleteModal}    
      />
      <Notification
        message={lastResponse.responseMessage}
        lastMessageTime={lastResponse.lastMessageTime}
        alertProps={{ severity: lastResponse.messageType }}
      />
    </Spinner>
    
  );
}

export default memo(Home);
