// This is the network that is responsible for maintaining all bots
// it initiates new bots, sends messages and commands to each bot
// and sends their responses to irc.
var BotNet = function(irc, bots) {
    this.irc = irc;

    // this.irc.addListener('message', function(from, to, message) {

    // });
    this.irc.addListener('error', function(message) {
        console.error('ERROR: %s: %s', message.command, message.args.join(' '));
    });

    this.irc.addListener('message#script?cie', function(from, message) {
        console.log('<%s> %s', from, message);
    });

    this.irc.addListener('message', function(from, to, message) {
        console.log('%s => %s: %s', from, to, message);
    });

    this.irc.addListener('message', function(from, to, message) {
        console.log("Heuj er komt iets binnen");
        this.handle(from, to, message);
    }.bind(this));

    this.irc.addListener('join', function(channel, from) {
        console.log('%s has joined %s', from, channel);

        // Dit is kut, moet straks op een andere manier
        if (from !== this.irc.nick) {
            this.irc.say(channel, "m0i " + from);
        }
    }.bind(this));

    this.bots = bots || [];
};

BotNet.prototype = {
    handle: function(from, to, message) {
        var irc = this;
        for (var i = 0; i < this.bots.length; i++) {
            this.bots[i].notify(message, from, function(messages) {
                irc.speakMessages(to, messages);
            });
        };
    },

    speakMessages: function(to, messages) {
        if (messages === undefined || messages.length === 0) {
            return;
        }
        var botNet = this;
        var message = messages.shift();
        setTimeout(function() {
            botNet.irc.say(to, message);
            botNet.speakMessages(to, messages);
        }, message.length * (25 + 25 * Math.random()));
    },
};

module.exports = BotNet;