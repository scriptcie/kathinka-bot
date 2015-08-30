var EventEmitter = require('events').EventEmitter;

var MessageEvent = function() {};

require('util').inherits(MessageEvent, EventEmitter);

var MessageBus = function(interfaces) {
    var self = this;
    this.queue = [];
    this.interfaces = interfaces;

    this.event = new MessageEvent();
    this.event.on('message', function() {
        self.handle();
    });

    this.locked = false;
}

MessageBus.prototype.add = function(message) {
    if (message instanceof Array) {
        this.queue.push.apply(this.queue, message);
    } else {
        this.queue.push(message);
    }
    this.event.emit('message');
}

MessageBus.prototype.handle = function() {
    if (this.locked) {
        return;
    }

    this.locked = true;
    while (this.queue.length > 0) {
        var message = this.queue.shift();
        if (message.type in this.interfaces) {
            this.interfaces[message.type].say([message.contents], message.to);
        } else {
            console.log("No interface found for a message of type "+message.type);
        }
    }
    this.locked = false;
}

MessageBus.prototype.addInterface = function(type, iface) {
    this.interfaces[type] = iface;
}

module.exports = MessageBus;
