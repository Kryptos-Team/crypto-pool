/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let PoolLogger = require('../../../modules/logger/logger');
require('../../../modules/config/reader');

// Initialize logger
let logger = new PoolLogger({
    logLevel: configuration.logLevel,
    logColors: configuration.logColors
});
const logSystem = 'API';

// Load input validation
const validateRegisterInput = require('../../../validation/accounts/register');
const validateLoginInput = require('../../../validation/accounts/login');

// Load user model
const User = require('../../../models/accounts/user.models');

// @route POST /api/users/register
// @desc Register user
// @access Public
router.post("/register", (request, response) => {
    // Form validation
    const {errors, isValid} = validateRegisterInput(request.body);

    // Check validation
    if (!isValid) {
        return response.status(400).json(errors);
    }

    User.findOne({email: request.body.email}).then(user => {
        if (user) {
            return response.status(400).json({email: "Email already exists"});
        } else {
            const newUser = new User({
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                email: request.body.email,
                password: request.body.password
            });

            // Hash the password before saving in the database
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if (error) throw error;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => response.json(user))
                        .catch(error => console.error(error));
                });
            });
        }
    });
});

// @route POST /api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (request, response) => {
    // Form validation
    const {errors, isValid} = validateLoginInput(request.body);

    // Check validation
    if (!isValid) {
        return response.status(400).json(errors);
    }

    const email = request.body.email;
    const password = request.body.password;

    // Find user by email
    User.findOne({email})
        .then(user => {
            if (!user) {
                return response.status(400).json({password: "Username or password is incorrect"});
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // Password has matched
                        const payload = {
                            id: user.id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            is_staff: user.is_staff,
                            is_superuser: user.is_superuser,
                            is_active: user.is_active,
                            date_joined: user.date_joined
                        };

                        // Sign token
                        jwt.sign(payload, configuration.accounts.secretOrKey, {expiresIn: 1}, (error, token) => {
                            response.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    } else {
                        return response.status(400).json({password: "Username or password is incorrect"});
                    }
                });
        });
});

logger.debug(logSystem, 'Accounts', 'Initialized');

module.exports = router;