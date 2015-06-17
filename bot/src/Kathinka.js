// Constructor
var Kathinka = function(commands, responses) {
    // Any command activated by /^[Kk]athinka(-bot)?(.*)$/
    //
    this.commands = commands || [];

    // General commands, such as goodbye,
    // I AM KATHINKA-BOT
    // reactions on private messages
    this.responses = responses || [];
};

Kathinka.prototype = {

    // Process a request, create
    notify: function(message, respond) {
        // Get the messages returned by the handlers
        var responses = this.handle(message);

        respond(responses);
    }

    // handles a message (one line of text)
    handle: function(message) {
        // Check if the message was a command to kathinka bot
        var command = message.match(/^[Kk]athinka(-bot)?(.*)$/);
        if (command)
        {
            return this.handleCommands(command);
        }

        // todo have it handle a set of requests
        return ['hallo, dit is een test', 'hier is een ander bericht'];
    }

    handleCommands: function(message) {

    },

    handleResponses: function(message) {

        var info = /^PING :(.+)$/i.exec(message);
        if (info)
        {
            irc.raw('PONG :' + info[1]);
        }

        if (/^:([^!@]+).*[^C,]PRIVMSG([^\:]+):(.+)$/.exec(message))
        {
            console.log("CONNECTED!");
            irc.raw("PRIVMSG NickServ :IDENTIFY " + config.user.pass);
            irc.raw("JOIN #script?cie");
        }

        if (/^:([^!@]+).*[^C,]JOIN[^#]+(#.+)$/.exec(message) {
            var user = info[1];
            var channel = info[2];
            if (user != config.user.nick) {
                irc.raw("PRIVMSG " + channel + " :moi " + user);
            }
        });


    },
};

// Zorgt ervoor dat we:
//     var kathinka = new require('Kathinka');
// kunnen doen
module.exports = Kathinka;