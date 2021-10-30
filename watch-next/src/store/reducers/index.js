import { combineReducers } from "redux";
import { movieReducer } from "./movieReducer";
import { userReducer } from "./userReducer";

const reducer = combineReducers({
    movieReducer,
    userReducer
})

export default reducer