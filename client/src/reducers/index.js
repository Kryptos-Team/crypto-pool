/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import {combineReducers} from "redux";
import authReducer from "./auth.reducers";
import errorReducer from "./error.reducers";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer
});