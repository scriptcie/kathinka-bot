var isACommand = require('../helpers/isACommand.js');

var GetSet = function(data) {
    this.data = data;
}

GetSet.prototype = {
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

module.exports = GetSet
