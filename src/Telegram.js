import telegram from 'telegram-bot-api';
import util from 'util';
import Message from './Message.js';

let Telegram = function(config, bots) {
    this.api = new telegram({
        token: config.token,
        updates: {
            enabled: true,
        },
    });

    this.bots = bots;
    let self = this;

    this.api.on('message', function(message) {
        console.log('Received message on Telegram: ' + message);
        self.handle(message.from.first_name, message.chat.id, message.text || "");
    });
};

Telegram.prototype = {
    handle: function(from, to, message) {
        let self = this;
        for (let i = 0; i < this.bots.length; i++) {
            let messageObj = new Message(Message.Type.Telegram, message, to);
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
            self.api.sendMessage({chat_id: to, text: message}, function(err, data) {
                console.log(err);
                console.log(util.inspect(data, false, null));
            });
            self.say(to, messages);
        }, message.length * (25 + 25 * Math.random()));
    },
};

module.exports = Telegram;
