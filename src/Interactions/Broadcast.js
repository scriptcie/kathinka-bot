var Message = require('../Message.js');

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

        // Add channels to state.channels so we can spam them back
        if (!(message.type in this.data)) {
            this.data[message.type] = [message.to];
        } else if (this.data[message.type].indexOf(message.to) === -1) {
            this.data[message.type].push(message.to);
        }

        var command = message.command();
        if (!command) {
            return undefined;
        }

        var matched = command.match(/broadcast\s+(.*)/);
        if(matched) {
            for (var type in this.data) {
                for (var to in this.data[type]) {
                    var message =  new Message(type, matched[1], this.data[type][to]);
                    this.bus.add(message);
                }
            }
            return "Message broadcasted";
        }
        return undefined;
    },
}

module.exports = Broadcast;
