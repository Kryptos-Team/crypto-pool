/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import {formMiddleware} from 'react-admin';
import {routerMiddleware} from 'react-router-redux';
import {createHashHistory} from 'history';
import rootReducer from "./reducers";
import rootSaga from "./rootSaga";
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";

export const adminHistory = createHashHistory();
const appMiddleware = [thunk, logger];

const configureStore = initialState => {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose;

    const store = createStore(rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(
                sagaMiddleware,
                formMiddleware,
                routerMiddleware(adminHistory),
                ...appMiddleware
            )
        )
    );
    sagaMiddleware.run(rootSaga);
    return store;
};

export const store = configureStore();