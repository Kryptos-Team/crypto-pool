/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require('./modules/db');
const app = express();
const passport = require('passport');
const users = require('./routes/api/accounts/users');

let fs = require('fs');
let path = require('path');
let os = require('os');
let async = require('async');
let cluster = require('cluster');

let PoolLogger = require('./modules/logger/logger');
require('./modules/config/reader');

// Initialize logger
let logger = new PoolLogger({
    logLevel: configuration.logLevel,
    logColors: configuration.logColors
});
const logSystem = 'Server';

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Passport middleware
app.use(passport.initialize());
// Passport configuration
require('./modules/accounts/passport');

// Routes
app.use(express.static(path.join(__dirname, '/client/public')));
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(logSystem, 'Main', `Server is running on port ${port}`));

// Try to give process ability to handle 100k concurrent connections
try {
    let posix = require('posix');
    try {
        posix.setrlimit('nofile', {soft: 100000, hard: 100000});
    } catch (error) {
        if (cluster.isMaster) {
            logger.warning('POSIX', 'Connection Limit', '(Safe to ignore) Must be ran as root to increase resource limits')
        }
    } finally {
        // Find out which user used sudo through environment variable
        let uid = parseInt(process.env.SUDO_UID);
        // Set our server's uid to that user
        if (uid) {
            process.setuid(uid);
            logger.debug('POSIX', 'Connection Limit', 'Raised to 100K concurrent connections, now running as non-root user: ' + process.getuid());
        }
    }
} catch (error) {
    if (cluster.isMaster) {
        logger.debug('POSIX', 'Connection Limit', '(Safe to ignore) POSIX module is not installed')
    }
}

if (cluster.isWorker) {
    switch (process.env.workerType) {
        default:
            console.log(process.env.workerType);
    }
}