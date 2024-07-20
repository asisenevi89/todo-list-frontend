import { takeEvery } from 'redux-saga/effects'
import {
  INIT_FETCH_TODO_LIST,
  INIT_CREATE_TODO,
  INIT_UPDATE_TODO,
  INIT_DELETE_TODO
} from "../ActionCreators/ActionTypes";
import {
  fetchTodoList,
  createTodo,
  updateTodo,
  deleteTodo
} from './Todo';

export function* watchTodo () {
  yield takeEvery(INIT_FETCH_TODO_LIST, fetchTodoList);
  yield takeEvery(INIT_CREATE_TODO, createTodo);
  yield takeEvery(INIT_UPDATE_TODO, updateTodo);
  yield takeEvery(INIT_DELETE_TODO, deleteTodo);
}