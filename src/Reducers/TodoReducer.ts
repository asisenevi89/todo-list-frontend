import { combineReducers} from "redux";
import todoReducer from "../Slices/Todo";

const todoListReducer = combineReducers({
  todoList: todoReducer,
})

export default todoListReducer;