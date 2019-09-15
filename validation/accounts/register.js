/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert an empty field to an empty string so that we can use validator functions
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : "";

    // Name checks
    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = "First name is required";
    }

    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last name is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username is required";
    } else if (!Validator.isLength(data.username, {min: 6, max: 30})) {
        errors.password = "Username length should be between 6-30 characters";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password length should be between 6-30 characters";
    }

    if (!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = "Passwords do not match";
    }

    return {errors, isValid: isEmpty(errors)};
};