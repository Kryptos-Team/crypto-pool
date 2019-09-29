/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import {applyMiddleware, compose, createStore} from 'redux';
import thunk from "redux-thunk";
import rootReducer from './reducers';
import logger from 'redux-logger';

const initialState = {};
const middleware = [thunk, logger];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        (window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose
    )
);

export default store;