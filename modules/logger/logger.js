/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

let dateFormat = require('dateformat');
let colors = require('colors');

let severityToColor = function (severity, text) {
    switch (severity) {
        case 'special':
            return text.cyan.underline;
        case 'debug':
            return text.green;
        case 'info':
            return text.blue;
        case  'warning':
            return text.yellow;
        case 'error':
            return text.red;
        default:
            console.log('Unknown severity: ' + severity);
            return text.italic;
    }
};

let severityValues = {
    'debug': 1,
    'info': 2,
    'warning': 3,
    'error': 4,
    'special': 5
};

let Logger = function (configuration) {
    let logLevelInt = severityValues[configuration.logLevel];
    let logColors = configuration.logColors;
    let logDateFormat = configuration.dateFormat;

    let log = function (severity, system, component, text, subcat) {
        if (severityValues[severity] < logLevelInt) return;

        if (subcat) {
            let realText = subcat;
            let realSubCat = text;
            text = realText;
            subcat = realSubCat;
        }

        let entryDesc = dateFormat(new Date(), logDateFormat) + ' [' + system + '] ';
        let logString = "";
        if (logColors) {
            entryDesc = severityToColor(severity, entryDesc);

            logString = entryDesc + ('[' + component + '] ').italic;
            if (subcat) logString += ('(' + subcat + ') ').bold.grey;

            logString += text.grey;
        } else {
            logString = entryDesc + '[' + component + '] ';
            if (subcat) logString += ('(' + subcat + ') ');

            logString += text;
        }

        console.log(logString);
    };

    let _this = this;
    Object.keys(severityValues).forEach(function (logType) {
        _this[logType] = function () {
            let args = Array.prototype.slice.call(arguments, 0);
            args.unshift(logType);
            log.apply(this, args);
        };
    });
};

module.exports = Logger;