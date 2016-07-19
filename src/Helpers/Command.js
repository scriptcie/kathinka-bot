var Message = require('./../Message.js');
var commands = {};

var CommandList = function() {
    this.commands = [];
}

CommandList.prototype = {
    add: function(command) {
        this.commands.push(command);
    },

    handle: function(message) {
        for (var i = 0; i < this.commands.length; i++) {
            var command = this.commands[i];
            if (message !== undefined) {
                command.message = message;
            }
            var ret = command.handle();
            if (ret) {
                return ret;
            }
        }
    },

    length: function() {
        return this.command.length;
    },
}

var Command = function(regexes, description, message, callback) {
    if (regexes instanceof Array) {
        this.regexes = regexes;
    } else {
        this.regexes = [regexes];
    }
    this.description = description;
    this.message = message;
    this.callback = callback;
    this.subcommands = new CommandList();
    commands[this.regexes] = this;
}

Command.prototype = {
    add: function(command) {
        this.subcommands.add(command);
    },

    handle: function() {
        var command = this.message;
        if (this.message instanceof Message) {
            command = this.message.command();
            if (!command) {
                return;
            }
        }

        for (var i = 0; i < this.regexes.length; i++) {
            var regex = this.regexes[i];
            if (this.subcommands.length) {
                if (regex instanceof RegExp) {
                    regex = regex.source;
                }
                var newRegex = new RegExp(regex + "\\s+(.*)");
                var matched = command.match(newRegex);
                if (matched) {
                    var ret = this.subcommands.handle(matched[matched.length-1]);
                    if (ret) {
                        return ret;
                    }
                }
            }

            if (regex instanceof RegExp) {
                regex = regex.source;
            }
            var newRegex = new RegExp(regex + '(.*)');
            var matched = command.match(newRegex);
            if (matched && this.callback) {
                return this.callback(matched);
            }
        }
    },
}

module.exports = Command;
module.exports.List = CommandList;
