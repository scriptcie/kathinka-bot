var Message = require('../Message.js');
var Command = require('../Helpers/Command.js');

var Help = function() {
}

Help.prototype = {
    interact: function(message, from) {
        message = Message.fromMessage(message, from);

        var commands = Command.commands;
        var command = new Command(
            'help',
            'Display all possible commands that can be used.\n' +
                'Use help command to get help about a certain command',
            message, function(matched) {
                if (matched[1].length) {
                    for (var key in commands) {
                        commandList = key.split(',');
                        for (var i = 0; i < commandList.length; i++) {
                            var regex = commandList[i];
                            if (matched[1].match(regex)) {
                                return commands[key].print();
                            }
                        }
                    }
                }
                var out = '';
                for (var key in commands) {
                    out += commands[key].print() + '\n';
                }
                return out;
            });
        return command.handle();
    },
}

module.exports = Help;
