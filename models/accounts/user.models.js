/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for user account
const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_staff: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_superuser: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date,
        required: false
    },
    date_joined: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model("users", UserSchema);