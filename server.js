/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const bodyParser = require("body-parser");
const connectDB = require('./modules/db');
const app = express();
const passport = require('passport');
const userRouter = require('./routes/api/accounts/users');
const fs = require('fs');
const path = require('path');
const os = require('os');
const async = require('async');
const cluster = require('cluster');
const cors = require('cors');

const PoolLogger = require('./modules/logger/logger');
require('./modules/config/reader');

// Initialize logger
const poolLogger = new PoolLogger({
    logLevel: configuration.logLevel,
    logColors: configuration.logColors
});
const logSystem = 'Server';

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/public')));
app.use(session({
    secret: configuration.accounts.secretOrKey,
    resave: true,
    saveUninitialized: false
}));

// Connect to MongoDB
connectDB();

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Passport configuration
require('./modules/accounts/passport')(passport);

// Routes
app.use('/api/users', userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => poolLogger.info(logSystem, 'Main', `Server is running on port ${port}`));

// Try to give process ability to handle 100k concurrent connections
try {
    const posix = require('posix');
    try {
        posix.setrlimit('nofile', {soft: 100000, hard: 100000});
    } catch (error) {
        if (cluster.isMaster) {
            poolLogger.warning('POSIX', 'Connection Limit', '(Safe to ignore) Must be ran as root to increase resource limits')
        }
    } finally {
        // Find out which user used sudo through environment variable
        const uid = parseInt(process.env.SUDO_UID);
        // Set our server's uid to that user
        if (uid) {
            process.setuid(uid);
            poolLogger.debug('POSIX', 'Connection Limit', 'Raised to 100K concurrent connections, now running as non-root user: ' + process.getuid());
        }
    }
} catch (error) {
    if (cluster.isMaster) {
        poolLogger.debug('POSIX', 'Connection Limit', '(Safe to ignore) POSIX module is not installed')
    }
}

if (cluster.isWorker) {
    switch (process.env.workerType) {
        default:
            console.log(process.env.workerType);
    }
}