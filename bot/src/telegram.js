var telegram = require('telegram-bot-api');
var util = require('util');
var Kathinka = require('../src/Kathinka.js');

var Telegram = function(config, bots) {
    this.api = new telegram({
            token: config.token,
            updates: {
                enabled: true
        }
    });

    this.bot = bots;
    var self = this;

    this.api.on('message', function(message){
        var data = {from: message.chat.id, name: message.from.first_name, text: message.text};
        //var Telegram = this;
        console.log(message.text);
        self.bot[0].notify(message.text,message.from.first_name, function(messages) {
                for (var m = 0; m < messages.length; m++) {
		    console.log(messages[m]);
                    self.api.sendMessage({ chat_id: message.chat.id, text: messages[m]}, function(err, data) {console.log(err); console.log(util.inspect(data, false, null));});
                };
            });
        return;
    });
};

module.exports = Telegram;
