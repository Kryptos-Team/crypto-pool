/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

const jwtDecode = require('jwt-decode');

module.exports = function validateAdmin(token) {
    const user = jwtDecode(token);

    return user.is_staff || user.is_superuser;
};