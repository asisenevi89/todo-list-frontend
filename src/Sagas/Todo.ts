import axios from "axios";
import { put } from "redux-saga/effects";
import {
  setTodoListLoading,
  setTodoList,
  setTodoListAfterUpdate,
  setTodoListAfterDelete,
} from "../Slices/Todo";
import { setLastResponseStatus } from "../Slices/ResponseStatus";
import { initFetchTodoList } from "../ActionCreators/Todo";
import { TodoListResponseType, InitActionType, AlertSeverityType } from "../Utils/CustomTypes";
import { DEFAULT_PAGE_SIZE, DEFAULT_OFFSET } from "../Utils/Constants";

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
    yield put(initFetchTodoList(DEFAULT_PAGE_SIZE, DEFAULT_OFFSET));
    yield put(setLastResponseStatus({
      responseMessage: 'Created New Todo.',
      lastMessageTime: Date.now(),
      messageType: AlertSeverityType.info,
    }));
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
    yield put(setLastResponseStatus({
      responseMessage: 'Successfully updated the Todo.',
      lastMessageTime: Date.now(),
      messageType: AlertSeverityType.info,
    }));
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
    yield put(setLastResponseStatus({
      responseMessage: 'Todo deleted!',
      lastMessageTime: Date.now(),
      messageType: AlertSeverityType.info,
    }));
  } catch (error) {
    yield put(setTodoListLoading(false));
    console.error(error);
  }
};