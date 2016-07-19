var Message = require('../Message.js');
var Command = require('../Helpers/Command.js');

var Help = function() {
}

Help.prototype = {
    interact: function(message, from) {
        message = Message.fromMessage(message, from);

        var commands = Command.commands;
        var command = new Command(
            ['help', 'man'],
            'Display all possible commands that can be used.\n' +
                'Use help command to get help about a certain command',
            message, function(matched) {
                var match = matched[2].trim();
                if (match.length) {
                    for (var key in commands) {
                        commandList = key.split(',');
                        for (var i = 0; i < commandList.length; i++) {
                            var regex = commandList[i];
                            var regexMatch = regex.match(
                                new RegExp('^\\^?/?(.*?)\\$?/?([gimy]*)$'));
                            regex = new RegExp('^' + regexMatch[1] + '$', regexMatch[2]);
                            if (match.match(regex)) {
                                return commands[key].print();
                            }
                        }
                    }
                    return match + ' not found. Use help without arguments to find all possible commands';
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
