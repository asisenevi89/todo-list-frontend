import { 
  INIT_FETCH_TODO_LIST,
  INIT_CREATE_TODO,
  INIT_DELETE_TODO,
  INIT_UPDATE_TODO,
} from "./ActionTypes";

import { TodoAddType } from "../Utils/CustomTypes";

const dataUrl = process.env.REACT_APP_BACKEND_URL;

export const initFetchTodoList = (count: number, skip: number, search:string = '') => {
  const url = `${dataUrl}/to-do?count=${count}&skip=${skip}&search=${search}`;

  return {
    type: INIT_FETCH_TODO_LIST,
    url,
  };
};

export const initCreateTodo = (data: TodoAddType) => {
  const url = `${dataUrl}/to-do`;

  return {
    type: INIT_CREATE_TODO,
    url,
    data
  };
};

export const initDeleteTodo = (id: number) => {
  const url = `${dataUrl}/to-do/${id}`;

  return {
    type: INIT_DELETE_TODO,
    url,
    id,
  };
};

export const updateTodo = (id: number, data: TodoAddType) => {
  const url = `${dataUrl}/to-do/${id}`;

  return {
    type: INIT_UPDATE_TODO,
    url,
    data,
    id,
  };
};