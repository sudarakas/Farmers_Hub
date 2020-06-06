import { combineReducers } from "redux";

import User from "./user_reducer";

//create the root reducer
const rootReducer = combineReducers({
    User
})

export default rootReducer;