var Message = require('../Message.js');
var Command = require('./../Helpers/Command.js');

var Logging = function(state) {
    this.state = state;
    this.shouldLog = false;
    this.log = [];

    // todo add some logStorage property
}

Logging.prototype = {
    interact: function(message, from) {
        message = Message.fromMessage(message, from);
        var command = message.command();
        if (command !== null) {
            var response = this.handleCommand(command, from);
            if (response !== undefined) {
                return response;
            }
        }

        if (this.shouldLog) {
            this.logMessage(message.contents, from);
        }

        return undefined;
    },

    handleCommand: function(message, sender) {
        var commandList = new Command.List('logging', 'Commands to manage the logger');
        commandList.add(
            new Command(/^start logging$/,
                        'Start logging',
                        message, function() {
                            if (this.shouldLog === false) {
                                this.shouldLog = true;
                                return "Started logging";
                            } else {
                                return "I'm already logging";
                            }
                        }.bind(this)));

        commandList.add(
            new Command(/^stop logging/,
                        'Stop logging',
                        message, function() {
                            if (this.shouldLog === true) {
                                this.shouldLog = false;
                                return "Ok, " + sender + " I've stopped logging";
                            } else {
                                return "I haven't been logging";
                            }
                        }.bind(this)));

        commandList.add(
            new Command(/show logs/,
                        'Show the logs',
                        message, function() {
                            var logs = this.log.map(function(log) {
                                return log.from + " said: \"" + log.message + "\"";
                            });
                            return logs;
                        }.bind(this)));

        return commandList.handle();
    },

    logMessage: function(message, from) {
        this.log.push({
            message: message,
            from: from,
        });
    },
}

module.exports = Logging;
