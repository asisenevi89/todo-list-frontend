import { createSelector} from "reselect";
import _get from 'lodash/get';
import { TodoStateType, TodoListType } from "../Utils/CustomTypes";

const emptyTodoList: TodoListType = {
  total: 0,
  data: [],
};

interface stateType {
  todo: {
    todoList: TodoStateType,
  }
};

const todoState = (state:stateType) => state.todo.todoList

export const makeTodoListLoading = createSelector(
  todoState, data => _get(data, 'isLoading', false),
);

export const makeTodoListData = createSelector(
  todoState, todoList => _get(todoList, 'data', emptyTodoList),
);

