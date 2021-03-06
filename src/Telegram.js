var telegram = require('telegram-bot-api');
var util = require('util');
var Message = require('./Message.js');

var Telegram = function(config, bots) {
    this.api = new telegram({
        token: config.token,
        updates: {
            enabled: true,
        },
    });

    this.bots = bots;
    var self = this;

    this.api.on('message', function(message) {
        console.log((new Date()) + "\tReceived message on Telegram: " + message);
        self.handle(message.from.first_name, message.chat.id, message.text || "", message.chat.type === "private");
    });
};

Telegram.prototype = {
    handle: function(from, to, message, private) {
        var self = this;
        for (var i = 0; i < this.bots.length; i++) {
            var messageObj = new Message(Message.Type.Telegram, message, to);
            messageObj.private = private;
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
        self.api.sendChatAction({chat_id: to, action:"typing"});

      setTimeout(function() {

            self.api.sendMessage({chat_id: to, text: message}, function(err, data) {
                console.log((new Date()) + err);
                console.log((new Date()) + util.inspect(data, false, null));
            });
            self.say(to, messages);
        }, message.length * (125 + 125 * Math.random()));
    },

    quit: function() {
    },
};

module.exports = Telegram;
