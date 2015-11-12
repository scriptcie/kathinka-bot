import Message from '../Message.js';

export default class Logging {
    constructor(state) {
        this.state = state;
        this.shouldLog = false;
        this.log = [];
    }

    interact(message, from) {
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
    }

    handleCommand(command, sender) {
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

        return undefined;
    }

    logMessage(message, from) {
        this.log.push({
            message: message,
            from: from,
        });
    }
}