/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

let fs = require('fs');

let configFile = (function () {
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i].indexOf('-config=') === 0) {
            return process.argv[i].split('=')[1];
        }
    }
    return 'config/config.json';
})();

try {
    global.configuration = JSON.parse(fs.readFileSync(configFile));
} catch (error) {
    console.error('Failed to read configuration file ' + configFile + '\n\n' + error.message);
    return;
}

global.version = "v0.0.1";
global.devDoantionAddress = "";