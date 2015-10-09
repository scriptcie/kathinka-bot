var Message = require('../Message.js');

var Properties = function(state) {
    this.state = state;
    this.data = state.properties;
}

Properties.prototype = {
    interact: function(message, from) {
        message = Message.fromMessage(message, from);
        var command = message.command();
        if (command !== null) {
            return this.handleCommand(command);
        }

        return undefined;
    },

    handleCommand: function(command) {
        var properties = this.state.properties;

        // Handle properties from a protected list differently
        var protectedList = {'user': "users", 'property': "properties"};
        var match = command.match(/^(set|get) (\w+) (.*)$/);
        if (match && match[2] in protectedList) {
            var name = protectedList[match[2]];
            if (!(name in this.state)) {
                this.state[name] = {};
            }
            properties = this.state[protectedList[match[2]]];
            command = match[1] + ' ' + match[3];
        }

        match = command.match(/^set (\w+) (.+)$/);
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
                properties[match[1]] = newdata;
            } else {
                properties[match[1]] = match[2];
            }
            return '' + match[1] + ' = ' + properties[match[1]];
        }

        match = command.match(/^get (.*)$/);
        if (match) {
            if (match[1] in properties) {
                return properties[match[1]];
            }
        }

        return undefined;
    },
}

module.exports = Properties
