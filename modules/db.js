/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

const mongoose = require('mongoose');

let PoolLogger = require('./logger/logger');
require('./config/reader');

// Initialize logger
let logger = new PoolLogger({
    logLevel: configuration.logLevel,
    logColors: configuration.logColors
});
const logSystem = 'MongoDB';

const db = configuration.db.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(
            db, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => logger.debug(logSystem, 'Connection', 'Server has successfully connected to MongoDB'))
            .catch(error => {
                logger.error(logSystem, 'Connection', 'Could not connect to MongoDB, exiting');
                process.exit(1);
            });
    } catch (error) {
        logger.error(logSystem, 'Connection', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;