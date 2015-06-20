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
            this.logMessage(message, from);
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

        var shouldShowLogs = /show logs/;
        if (shouldShowLogs.test(command)) {
            var logs = this.log.map(function(log) {
                return log.from + " said: \"" + log.message + "\"";
            });
            return logs;
        }

        return null;
    },

    logMessage: function(m, f) {
        this.log.push({
            message: m,
            from: f
        });
    },
}

module.exports = Logging;