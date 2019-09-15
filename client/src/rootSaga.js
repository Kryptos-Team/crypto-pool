/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import {all, fork} from 'redux-saga/effects';
import {adminSaga, defaultI18nProvider} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

export const authProvider = () => Promise.resolve();
export const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const i18nProvider = defaultI18nProvider;

export default function* rootSaga() {
    yield all([
        adminSaga(dataProvider, authProvider, i18nProvider)
    ].map(fork));
}