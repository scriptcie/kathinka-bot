// Kathinka is a bot that can interact with messages
//
var Kathinka = function(interactions) {
    this.interactions = interactions || [];

    // // Any command activated by /^[Kk]athinka(-bot)?(.*)$/
    // //
    // this.commands = commands || [];

    // // General commands, such as goodbye,
    // // I AM KATHINKA-BOT
    // // reactions on private messages
    // this.responses = responses || [];
};

Kathinka.prototype = {

    // Process a request, create
    notify: function(message, from, respond) {
        // Get the messages returned by the handlers
        var responses = this.handle(message, from);

        respond(responses);
    },

    // handles a message (one line of text)
    handle: function(message, from) {
        var responses = [];

        for (var idx = 0; idx < this.interactions.length; idx++) {
            var interaction = this.interactions[idx];
            responses.push({
                message: interaction.interact(message, from),
                priority: idx
            });
        };

        return responses[0].message;

        return null;
    },

    handleCommands: function(message) {

    },

    handleResponses: function(message) {

        var info = /^PING :(.+)$/i.exec(message);
        if (info) {
            irc.raw('PONG :' + info[1]);
        }

        info = /^:([^!@]+).*[^C,]PRIVMSG([^\:]+):(.+)$/.exec(message);
        if (info) {
            console.log("CONNECTED!");
            irc.raw("PRIVMSG NickServ :IDENTIFY " + config.user.pass);
            irc.raw("JOIN #script?cie");
        }

        info = /^:([^!@]+).*[^C,]JOIN[^#]+(#.+)$/.exec(message);
        if (info) {
            var user = info[1];
            var channel = info[2];
            if (user != config.user.nick) {
                irc.raw("PRIVMSG " + channel + " :moi " + user);
            }
        };
    },
};

// Zorgt ervoor dat we:
//     var kathinka = new require('Kathinka');
// kunnen doen
module.exports = Kathinka;