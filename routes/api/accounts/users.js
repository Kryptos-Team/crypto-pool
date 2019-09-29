/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const decodeJwt = require('jwt-decode');

const passport = require('passport');

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

// Load Admin Validation check
const validateAdmin = require('../../../validation/accounts/admin');

// @route POST /api/users/register/
// @desc Register user
// @access Public
router.post("/register/", (request, response) => {
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
            User.findOne({username: request.body.username}).then(user => {
                if (user) {
                    return response.status(400).json({username: "Username already exists"});
                } else {
                    let is_superuser, is_staff = false;
                    if (request.body.username === "administrator") {
                        is_superuser = true;
                        is_staff = true;
                    }

                    const newUser = new User({
                        first_name: request.body.first_name,
                        last_name: request.body.last_name,
                        email: request.body.email,
                        username: request.body.username,
                        password: request.body.password,
                        is_staff: is_staff,
                        is_superuser: is_superuser
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
            })
        }
    });
});

// @route POST /api/users/login/
// @desc Login user and return JWT token
// @access Public
router.post("/login/", (request, response) => {
    // Form validation
    const {errors, isValid} = validateLoginInput(request.body);

    // Check validation
    if (!isValid) {
        return response.status(400).json(errors);
    }

    const username = request.body.username;
    const password = request.body.password;

    // Find user by email
    User.findOne({username})
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
                            display_name: user.first_name + " " + user.last_name,
                            email: user.email,
                            username: user.username,
                            is_staff: user.is_staff,
                            is_superuser: user.is_superuser,
                            is_active: user.is_active,
                            date_joined: user.date_joined
                        };

                        // Sign token
                        jwt.sign(payload, configuration.accounts.secretOrKey, {expiresIn: "1d"}, (error, token) => {
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

// @route GET /api/users/
// @desc Lists all users
// @access Private
router.get("/", passport.authenticate("jwt", {session: false}), async (request, response) => {
    const is_allowed = validateAdmin(request.headers.authorization);
    if (is_allowed) {
        User.find({})
            .then(users => {
                response.json({data: users});
            })
            .catch(error => {
                return response.status(400).json({error: error});
            })
    } else {
        return response.status(401).json({error: "Unauthorized"});
    }
});

// @route GET /api/users/id/
// @desc Get user by ID
// @access Private
router.get("/:id", passport.authenticate("jwt", {session: false}), async (request, response) => {
    const is_allowed = validateAdmin(request.headers.authorization);
    const user_id = request.params.id;

    if (is_allowed) {
        User.findOne({_id: user_id})
            .then(user => {
                response.json({data: user});
            })
            .catch(error => {
                return response.status(400).json({error: error});
            })
    } else {
        return response.status(401).json({error: "Unauthorized"});
    }
});

// @route POST /api/users/create/
// @desc Register user
// @access Private
router.post("/create/", (request, response) => {
    const is_allowed = validateAdmin(request.headers.authorization);

    if (is_allowed) {
        // Form validation
        const {errors, isValid} = validateRegisterInput(request.body);

        // Check validation
        if (!isValid) {
            return response.status(400).json({errors: errors});
        }

        User.findOne({email: request.body.email}).then(user => {
            if (user) {
                return response.status(400).json({errors: {email: "Email already exists"}});
            } else {
                User.findOne({username: request.body.username}).then(user => {
                    if (user) {
                        return response.status(400).json({errors: {username: "Username already exists"}});
                    } else {
                        let is_superuser, is_staff = false;
                        if (request.body.username === "administrator") {
                            is_superuser = true;
                            is_staff = true;
                        }

                        const newUser = new User({
                            first_name: request.body.first_name,
                            last_name: request.body.last_name,
                            email: request.body.email,
                            username: request.body.username,
                            password: request.body.password,
                            is_staff: is_staff,
                            is_superuser: is_superuser
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
                })
            }
        });
    } else {
        return response.status(401).json({error: "Unauthorized"});
    }
});

logger.debug(logSystem, 'Accounts', 'Initialized');

module.exports = router;