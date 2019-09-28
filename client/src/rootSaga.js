/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import {all, fork} from 'redux-saga/effects';
import {adminSaga, defaultI18nProvider} from 'react-admin';
import dataProviders from './providers/data.providers';

export const authProvider = () => Promise.resolve();
export const dataProvider = dataProviders;
const i18nProvider = defaultI18nProvider;

export default function* rootSaga() {
    yield all([
        adminSaga(dataProvider, authProvider, i18nProvider)
    ].map(fork));
}