/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import {AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT} from 'react-admin';
import decodeJwt from 'jwt-decode';

export default (type, params) => {
    let role = "miner";

    if (type === AUTH_LOGIN) {
        const {username, password} = params;
        const request = new Request('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({token}) => {
                sessionStorage.setItem('token', token);
            });
    }

    if (type === AUTH_LOGOUT) {
        sessionStorage.removeItem('token');
        return Promise.resolve();
    }

    if (type === AUTH_ERROR) {
        const status = params.status;
        if (status === 401 || status === 403) {
            sessionStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
        return sessionStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }

    if (type === AUTH_GET_PERMISSIONS) {
        const r = decodeJwt(sessionStorage.getItem('token'));
        if (r.is_superuser) {
            role = "superuser";
        } else if (r.is_staff) {
            role = "staff";
        }
        return role ? Promise.resolve(role) : Promise.reject();
    }

    return Promise.resolve();
}