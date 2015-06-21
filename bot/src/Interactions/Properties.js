var isACommand = require('../Helpers/IsACommand.js');

var Properties = function(data) {
    this.data = data;
}

Properties.prototype = {
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
        var match = command.match(/^set (\w+) (.+)$/);
        if (match) {
            this.data[match[1]] = match[2];
            return undefined;
        }

        match = command.match(/^get (.*)$/);
        if (match) {
            if (match[1] in this.data) {
                return this.data[match[1]];
            }
        }

        return undefined;
    },
}

module.exports = Properties
