/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Convert an empty field to an empty string so that we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "username is required";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    return {errors, isValid: isEmpty(errors)};
};