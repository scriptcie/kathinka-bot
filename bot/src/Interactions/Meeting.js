var isACommand = require('../Helpers/IsACommand.js');

var Meeting = function(data) {
    this.data = data;
    this.started = false;
}

Meeting.prototype = {
    interact: function(message, from) {
        var command = isACommand(message);
        if (command !== null) {
            var response = this.handleCommand(command, from);
            if (response !== undefined) {
                return response;
            }
        }

        return undefined;
    },

    handleCommand: function(command, sender) {
        if (command === "start meeting" || command === "start vergadering") {
            this.started = true;
            return "Starting meeting";
        }
        if (command === "stop meeting" || command === "stop vergadering") {
            this.started = false;
            return "Stopping meeting";
        }
        return undefined;
    },
}

module.exports = Meeting
