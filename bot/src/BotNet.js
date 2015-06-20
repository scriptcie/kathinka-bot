var Kathinka = require('./Kathinka.js');
// This is the network that is responsible for maintaining all bots
// it initiates new bots, sends messages and commands to each bot
// and sends their responses to irc.
var BotNet = function(irc, channels, bots) {
    this.irc = irc;
    this.channels = channels;

    this.bots = bots || [];
};

BotNet.prototype = {
    handle: function(message, from) {
        var irc = this;
        for (var i = 0; i < this.bots.length; i++) {
            this.bots[i].notify(message, from, function(messages) {
                for (var m = 0; m < messages.length; m++) {
                    irc.speak(messages[m]);
                };
            });
        };
    },

    // Wait a few seconds such that we get a realistic response
    speak: function(message) {
        return setTimeout(message.length * 50, this.irc.say(message));
    },


    handleData: function(data) {
        // lees de data regel voor regel
        lines = data.split('\n');
        // print wat er binnenkomt
        //console.log('RECV -', data[idx]);
        // als het geen lege regel is haal dan even de extra enter weg. Dat doet IRC blijkbaar een \r\n situatie. mss hadden we ook kunnen splitten op \r\n?
        for (var idx = 0; idx < lines.length; idx++) {
            if (lines !== '') {
                irc.handle(lines[idx].slice(0, -1));
            }
        }
    },
};

module.exports = BotNet;