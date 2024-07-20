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

const reportState = (state:stateType) => state.todo.todoList

export const makeTodoListLoading = createSelector(
  reportState, data => _get(data, 'isLoading', false),
);

export const makeTodoListData = createSelector(
  reportState, todoList => _get(todoList, 'data', emptyTodoList),
);

