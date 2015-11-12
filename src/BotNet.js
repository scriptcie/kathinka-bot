// This is the network that is responsible for maintaining all bots
// it initiates new bots, sends messages and commands to each bot
// and sends their responses to irc.
import Message from './Message.js';

let BotNet = function(irc, bots) {
    this.irc = irc;

    // this.irc.addListener('message', function(from, to, message) {

    // });
    this.irc.addListener('error', function(message) {
        console.error('ERROR: %s: %s', message.command, message.args.join(' '));
    });

    this.irc.addListener('message', function(from, to, message) {
        console.log('IRC: %s => %s: %s', from, to, message);

        // Private messages
        if (to === this.irc.nick) {
            to = from;
        }

        this.handle(from, to, message);
    }.bind(this));

    this.irc.addListener('join', function(channel, from) {
        console.log('%s has joined %s', from, channel);

        // Dit is kut, moet straks op een andere manier
        if (from !== this.irc.nick) {
            this.irc.say(channel, "moi " + from);
        }
    }.bind(this));

    this.bots = bots || [];
};

BotNet.prototype = {
    handle: function(from, to, message) {
        let self = this;
        for (let i = 0; i < this.bots.length; i++) {
            let messageObj = new Message(Message.Type.IRC, message, to);
            this.bots[i].notify(messageObj, from, function(messages) {
                self.say(to, messages);
            });
        }
    },

    say: function(to, messages) {
        if (messages === undefined || messages.length === 0) {
            return;
        }
        let self = this;
        let message = messages.shift();
        setTimeout(function() {
            self.irc.say(to, message);
            self.say(to, messages);
        }, message.length * (25 + 25 * Math.random()));
    },
};

module.exports = BotNet;
