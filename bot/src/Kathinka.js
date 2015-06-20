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

        // Get any valid re
        this.interactions.forEach(function(interaction, index) {
            var response = interaction.interact(message, from);

            // We don't want to return empty responses
            if (response === undefined && response === null) {
                return;
            }

            // Remember the response and its priority such that we can
            // determine which response to return based on priority
            responses.push({
                message: response,
                priority: this.basePriorityOf(index)
            });
        }, this);

        return this.prioritizedResponse(responses);
    },

    prioritizedResponse: function(responses) {
        // By default we won't return a response
        var prioritized = { message: null, priority: -1 };

        // Return the response with the heighest priority
        responses.forEach(function(res) {
            if (prioritized.priority < res.priority) {
                prioritized = res;
            }
        });

        return prioritized.message;
    },

    basePriorityOf: function(index) {
        return index;
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