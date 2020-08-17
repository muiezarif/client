import {combineReducers} from "redux";
import authReducer from "./authReducer";
import StreamReducer from "./StreamReducer";
import {reducer as formReducer} from "redux-form";
export default combineReducers({
    auth:authReducer,
    form:formReducer,
    streams:StreamReducer
})