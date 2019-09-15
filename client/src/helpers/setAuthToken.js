/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import axios from "axios";

const setAuthToken = token => {
    if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;