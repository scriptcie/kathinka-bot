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

    print: function() {
        var out = '';
        this.commands.forEach(function (command) {
            out += '\n' + command.print();
        });
        return out;
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
                var newRegex = this.regexFromRegex(regex, "(.*)");
                var matched = command.match(newRegex);
                if (matched) {
                    var ret = this.subcommands.handle(matched[matched.length-1]);
                    if (ret) {
                        return ret;
                    }
                }
            }

            var newRegex = this.regexFromRegex(regex, '(.*)');
            var matched = command.match(newRegex);
            if (matched && this.callback) {
                return this.callback(matched);
            }
        }
    },

    regexFromRegex: function(regex, addition) {
        var text = '';
        var flags = '';
        if (regex instanceof RegExp) {
            text = regex.source;
            if (regex.global) flags += 'g';
            if (regex.ignoreCase) flags += 'i';
            if (regex.multiline) flags += 'm';
        } else {
            // Escape string
            text = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");;
        }
        if (text.length && text[0] != '^') {
            text = '^' + text;
        }
        if (text.length && text.slice(-1) != '$') {
            text += '(\\s+|$)';
        }
        return new RegExp(text + addition, flags);
    },

    print: function() {
        var out = '';
        if (this.regexes.length === 1) {
            out += this.regexes[0] + ': ' + this.description;
        } else if (this.regexes.length > 1) {
            out += '[';
            this.regexes.forEach(function (regex) {
                out += regex + ', ';
            });
            out = out.slice(0, -2);
            out += ']: ' + this.description;
        }
        subout = this.subcommands.print();
        subout = subout.replace(/\n/gm, '\n    ');
        out += subout;
        return out;
    },
}

module.exports = Command;
module.exports.List = CommandList;
module.exports.commands = commands;
