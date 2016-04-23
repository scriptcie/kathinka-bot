// This is the network that is responsible for maintaining all bots
// it initiates new bots, sends messages and commands to each bot
// and sends their responses to irc.
var Message = require('./Message.js');

var BotNet = function(irc, bots) {
    this.irc = irc;

    // this.irc.addListener('message', function(from, to, message) {

    // });
    this.irc.addListener('error', function(message) {
        console.error('%s\tERROR: %s: %s', new Date(), message.command, message.args.join(' '));
    });

    this.irc.addListener('message', function(from, to, message) {
        console.log('%s\tIRC: %s => %s: %s', new Date(), from, to, message);

        // Private messages
        if (to === this.irc.nick) {
            to = from;
        }

        this.handle(from, to, message);
    }.bind(this));

    this.irc.addListener('join', function(channel, from) {
        console.log('%s\t%s has joined %s', new Date(), from, channel);

        // Dit is kut, moet straks op een andere manier
        if (from !== this.irc.nick) {
            this.irc.say(channel, "moi " + from);
        }
    }.bind(this));

    this.bots = bots || [];
};

BotNet.prototype = {
    handle: function(from, to, message) {
        var self = this;
        for (var i = 0; i < this.bots.length; i++) {
            var messageObj = new Message(Message.Type.IRC, message, to);
            this.bots[i].notify(messageObj, from, function(messages) {
                self.say(to, messages);
            });
        }
    },

    say: function(to, messages) {
        if (messages === undefined || messages.length === 0) {
            return;
        }
        var self = this;
        var message = messages.shift();
        setTimeout(function() {
            self.irc.say(to, message);
            self.say(to, messages);
        }, message.length * (25 + 25 * Math.random()));
    },

    quit: function() {
        this.irc.disconnect("Is goed, doei!");
    },
};

module.exports = BotNet;
