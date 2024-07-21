import { combineReducers} from "redux";
import responseStatusReducer from "../Slices/ResponseStatus";

const generalReducer = combineReducers({
  lastResponseStatus: responseStatusReducer,
})

export default generalReducer;