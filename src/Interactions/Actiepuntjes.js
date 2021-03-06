var Message = require('../Message.js');
var Command = require('../Helpers/Command.js');

var Actiepuntjes = function(state) {
    this.state = state
    this.data = state.actiepuntjes;
}

Actiepuntjes.prototype = {
    interact: function(message, from) {
        message = Message.fromMessage(message, from);

        var command = new Command(
            new RegExp(/(actiepunt[a-z]*|ap[a-z]*)/i),
            'Add actiepuntje. Usage: name description',
            message, function(matched) {
                matched = matched[matched.length-1].match(/(\S+)\s+(.*)/);
                if (matched) {
                    return this.save(matched[1], matched[2].trim());
                }
            }.bind(this));

        command.add(
            new Command(['ls', 'list'], 'List all actiepuntjes',
                        message, function() {
                            return this.displayAll();
                        }.bind(this)));

        command.add(
            new Command(['rm', 'voltooid', 'remove', 'gedaan'],
                        'Remove an actiepuntje by subject or index',
                        message, function(matched) {
                            return this.remove(matched[matched.length-1].trim());
                        }.bind(this)));

        return command.handle();
    },

    displayAll: function() {
        var response = [];
        var idx = 0;
        for(var name in this.data) {
            this.data[name].forEach(function(a) {
                ++idx;
                response.push(idx + ". AP " + name + " " + a);
            });
        }
        return response;
    },

    save: function(name, ap) {
        if (this.data[name] === undefined) {
            this.data[name] = [ap];
            return;
        }
        this.data[name].push(ap);
    },

    remove: function(ap) {
        var toInt = parseInt(ap);

        // Remove the ith APtje
        if(! isNaN(toInt) && toInt > 0) {
            return this.removeByIndex(toInt);
        }

        return this.removeBySubject(ap);
    },

    removeBySubject: function(ap) {
        for(var name in this.data){
            var idx = this.data[name].indexOf(ap);
            if (idx != -1) {
                this.data[name].splice(idx, 1)
                return "Goed bezig " + name;
            }
        }
    },

    removeByIndex: function(idx) {
        for(var name in this.data){
            if(idx <= this.data[name].length) {
                this.data[name].splice(idx - 1, 1);
                return "Goed bezig " + name;
            } else {
                idx -= this.data[name].length;
            }
        }
    },
}

module.exports = Actiepuntjes;
