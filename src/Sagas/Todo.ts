import axios from "axios";
import { put } from "redux-saga/effects";
import {
  setTodoListLoading,
  setTodoList,
  setTodoListAfterUpdate,
  setTodoListAfterDelete,
} from "../Slices/Todo";
import { TodoListResponseType, InitActionType, TodoType } from "../Utils/CustomTypes";

type AxiosTodoListResponseType = {
  data: TodoListResponseType,
};

export function* fetchTodoList(action: InitActionType) {
  const { url } = action;

  try {
    yield put(setTodoListLoading(true));
    const response: AxiosTodoListResponseType = yield axios.get(url);
    
    yield put(setTodoList(response.data.data));
    yield put(setTodoListLoading(false));

  } catch (error) {
    yield put(setTodoListLoading(false));
    console.error(error);
  }
};

export function* createTodo(action: InitActionType) {
  const { url, data } = action;

  try {
    yield put(setTodoListLoading(true));
    yield axios.post(url, data);
    yield put(setTodoListLoading(false));

  } catch (error) {
    yield put(setTodoListLoading(false));
    console.error(error);
  }
};

export function* updateTodo(action: InitActionType) {
  const { url, data, id } = action;

  try {
    yield put(setTodoListLoading(true));
    yield axios.put(url, data);
    yield put(setTodoListAfterUpdate({id, ...data}))
    yield put(setTodoListLoading(false));

  } catch (error) {
    yield put(setTodoListLoading(false));
    console.error(error);
  }
};

export function* deleteTodo(action: InitActionType) {
  const { url, id } = action;

  try {
    yield put(setTodoListLoading(true));
    yield axios.delete(url);
    yield put(setTodoListAfterDelete(id))
    yield put(setTodoListLoading(false));

  } catch (error) {
    yield put(setTodoListLoading(false));
    console.error(error);
  }
};