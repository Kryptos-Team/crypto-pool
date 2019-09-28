/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */
import axios from "axios";
import {GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE} from "react-admin";
import setAuthToken from "../helpers/setAuthToken";

const API_URL = 'http://localhost:5000/api';

const convertDataProviderRequestToHTTP = (type, resource, params) => {
    switch (type) {
        case GET_LIST:
            return {url: `${API_URL}/${resource}/`};

        case GET_ONE:
            return {url: `${API_URL}/${resource}/${params.id}`};

        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }
};

const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    switch (type) {
        case GET_MANY_REFERENCE:
        case GET_MANY:
        case GET_LIST: {
            return {
                data: response.data.data.map(value => Object.assign({
                        id: value._id
                    },
                    value)),
                total: Object.keys(response.data).length,
            };
        }

        case GET_ONE:
            return {
                data: response.data.data.map(value => Object.assign({
                        id: value._id
                    },
                    value)),
            };

        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }
};

export default (type, resource, params) => {
    setAuthToken(sessionStorage.getItem("token"));
    const {url} = convertDataProviderRequestToHTTP(type, resource, params);


    return axios({url})
        .then((response) => convertHTTPResponseToDataProvider(response, type, resource, params))
        .catch(error => {
            console.error(error);
        })
};