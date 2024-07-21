import { combineReducers} from "redux";
import todo from "./TodoReducer";
import general from "./GeneralReducer";

const rootReducer = combineReducers({
  todo,
  general,
});

export default rootReducer;