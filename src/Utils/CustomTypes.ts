export type InitActionType = {
  type: string
  url: string,
  data: TodoAddType,
  id: number,
};

export type TodoStateType = {
  isLoading: false,
  data: TodoListType,
};

export type TodoType = {
  id: number,
  title: string,
  status: string,
};

export type TodoListType = {
  total: number,
  data: TodoType[],
};

export type TodoAddType = {
  title: string,
  status: string,
};

export type TodoListResponseType = {
  status: boolean,
  message: string,
  data: TodoListType[],
};

export type TodoTypeKeyMap = {
  id: string
  title: string,
  status: string,
};

export enum AlertSeverityType {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning'
};

export type RequestStatusType = {
  responseMessage: string,
  lastMessageTime: number,
  messageType: AlertSeverityType
};
