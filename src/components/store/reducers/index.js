import { combineReducers } from "redux";

import User from "./user_reducer";
import Item from './item_reducers';

//create the root reducer
const rootReducer = combineReducers({
    User,
    Item
})

export default rootReducer;