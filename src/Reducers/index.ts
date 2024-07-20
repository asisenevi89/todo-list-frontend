import { combineReducers} from "redux";
import todo from "./TodoReducer";

const rootReducer = combineReducers({
  todo,
});

export default rootReducer;