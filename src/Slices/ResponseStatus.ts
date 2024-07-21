import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _get from 'lodash/get';
import { AlertSeverityType, RequestStatusType } from '../Utils/CustomTypes';

export const initialState = {
  responseMessage: '',
  lastMessageTime: 0,
  messageType: AlertSeverityType.info
};

const responseStatusSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setLastResponseStatus: (state, action: PayloadAction<RequestStatusType>) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});

export const {
  setLastResponseStatus,
} = responseStatusSlice.actions;
export default responseStatusSlice.reducer;
