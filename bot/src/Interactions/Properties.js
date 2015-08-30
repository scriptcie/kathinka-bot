var isACommand = require('../Helpers/IsACommand.js');

var Properties = function(state) {
    this.state = state;
    this.data = state.properties;
}

Properties.prototype = {
    interact: function(message, from) {
        var command = isACommand(message);
        if (command !== null) {
            return response = this.handleCommand(command, from);
        }

        return undefined;
    },

    handleCommand: function(command, sender) {
        var match = command.match(/^set (\w+) (.+)$/);
        if (match) {
            var data = match[2];
            if (data.length > 2 &&
                data.substring(0, 1) == '[' &&
                data.substring(data.length - 1, data.length) == ']') {
                data = data.substring(1, data.length-1);
                data = data.split(',');
                var newdata = [];
                for (var i = 0; i < data.length; i++) {
                    newdata[i] = data[i].replace(/^\s+|\s+$/g, '');
                }
                this.data[match[1]] = newdata;
            } else {
                this.data[match[1]] = match[2];
            }
            return '' + match[1] + ' = ' + this.data[match[1]];
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
