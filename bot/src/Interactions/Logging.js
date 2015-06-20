var isACommand = require('../helpers/isACommand.js');

var Logging = function() {
    this.shouldLog = false;
    this.log = [];

    // todo add some logStorage property
}

Logging.prototype = {
    interact: function(message, from) {
        var command = isACommand(message);
        if (command !== null) {
            return this.handleCommand(command, from);
        }

        if (this.shouldLog) {
            this.logMessage(message);
        }

        return null;
    },

    handleCommand: function(command, sender) {
        var shouldStart = /^start logging$/;
        if (shouldStart.test(command)) {
            if (this.shouldLog === false) {
                this.shouldLog = true;
                return "Started logging";
            } else {
                return "I'm already logging";
            }
        }

        var shouldStop = /^stop logging/;
        if (shouldStop.test(command)) {
            if (this.shouldLog === true) {
                this.shouldLog = false;
                return "Ok, " + sender + " I've stopped logging";
            } else {
                return "I haven't been logging";
            }
        }

        return null;
    },

    logMessage: function(message) {
        this.log.push(message);
    },
}

module.exports = Logging;