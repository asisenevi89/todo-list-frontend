import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _set from 'lodash/set';
import _get from 'lodash/get';
import { TodoListType, TodoType } from '../Utils/CustomTypes';

const initialState = {
  isLoading: false,
  data: {
    total: 0,
    data: []
  },
};

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodoListLoading: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isLoading', action.payload);
    },
    setTodoList(state, action: PayloadAction<TodoListType[]>) {
      _set(state, 'data', action.payload);
    },
    setTodoListAfterUpdate(state, action: PayloadAction<TodoType>) {
      const { payload } = action;
      const list: TodoType[]  = _get(state, 'data.data', []);
      const findIndex = list.findIndex((item: TodoType) => item.id === payload.id);

      if (findIndex === -1) return;
      list[findIndex] = payload;
      const updated = [...list];
      _set(state, 'data', updated);
    },
    setTodoListAfterDelete(state, action: PayloadAction<number>) {
      const { payload } = action;
      const list: TodoType[]  = _get(state, 'data.data', []);
      const updatedList = list.filter((item: TodoType) => item.id === payload);
      const currentTotal: number = _get(state, 'data.total', 0);
      const newState = {
        total: currentTotal ? currentTotal - 1 : 0,
        data: updatedList,
      };

      _set(state, 'data', newState);
    }
  },
})

export const {
  setTodoListLoading,
  setTodoList,
  setTodoListAfterUpdate,
  setTodoListAfterDelete,
} = todoSlice.actions;
export default todoSlice.reducer;
