var Message = require('../Message.js');
var Command = require('./../Helpers/Command.js');

var Broadcast = function(state, bus) {
    this.state = state;
    this.bus = bus;

    if (!('channels' in state)) {
        state.channels = {};
    }
    this.data = state.channels;
}

Broadcast.prototype = {
    interact: function(message, from) {
        message = Message.fromMessage(message, from);

        // Add channels to state.channels so we can spam them back.
        // At the moment we spam public channels and everyone on Steam
        if (!message.private || message.type === Message.Type.Steam) {
            if (!(message.type in this.data)) {
                this.data[message.type] = [message.to];
            } else if (this.data[message.type].indexOf(message.to) === -1) {
                this.data[message.type].push(message.to);
            }
        } else if (message.type in this.data) {
            // Remove private channels if they were already in there
            var index = this.data[message.type].indexOf(message.to);
            if (index > -1) {
                this.data[message.type].splice(index, 1);
            }
        }

        var command = new Command(
                /broadcast\s+(.*)/,
            'Broadcast a message to all channels',
            message, function(matched) {
                for (var type in this.data) {
                    for (var to in this.data[type]) {
                        var broadcast =  new Message(type, matched[1], this.data[type][to]);
                        this.bus.add(broadcast);
                    }
                }
                return "Message broadcasted";
            }.bind(this));
        return command.handle();
    },
}

module.exports = Broadcast;
