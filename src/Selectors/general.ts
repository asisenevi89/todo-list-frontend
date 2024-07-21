import { createSelector} from "reselect";
import _get from 'lodash/get';
import { RequestStatusType } from "../Utils/CustomTypes";
import { initialState as defaultStatus } from "../Slices/ResponseStatus";


interface stateType {
  general: {
    lastResponseStatus: RequestStatusType
  }
};

const generalState = (state:stateType) => state.general

export const makeLastResponseState = createSelector(
  generalState, data => _get(data, 'lastResponseStatus', defaultStatus),
);

