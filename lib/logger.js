//"use strict";

var loggers = {};

function setLogger(level, logger) {
    switch (level) {
        case "error":
            loggers.error = logger;
            break;
        case "warn":
            loggers.warn = logger;
            break;
        case "log":
            loggers.log = logger;
            break;
    }
}

function error() {
    if (typeof (loggers.error) === "function") {
        loggers.error(arguments);
    }
}

function warn() {
    if (typeof (loggers.warn) === "function") {
        loggers.warn(arguments);
    }
}

function log() {
    if (typeof (loggers.log) === "function") {
        loggers.log(arguments);
    }
}

module.exports = {
    setLogger: setLogger,
    error: error,
    warn: warn,
    log: log
}
