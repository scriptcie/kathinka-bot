// This is the network that is responsible for maintaining all bots
//
var BotNet = function(irc) {
    this.irc = irc;
};

BotNet.prototype = {
    handle: function(line) {
        var irc = this;
        var message = line;
        for (var i = 0; i < this.bots.length; i++) {
            this.bots[i].notify(message, function(messages) {
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

    connect: function() {
        //zeg dat we connecten
        console.log('Established connection, registering and misc...');
        // setTimeout(function(){  }, 2000);
        // bouw listener: als PING, dan PONG. irc.on staat hieronder.
        irc.on(/^PING :(.+)$/i, function(info) {
            irc.raw('PONG :' + info[1]);
        });

        // laat zien wanneer je connected bent
        irc.on(/End of \/MOTD command/i, function(info) {
            console.log("CONNECTED!");
            irc.raw("PRIVMSG NickServ :IDENTIFY " + config.user.pass);
            irc.raw("JOIN #script?cie");
        });

        ////////////////////////////////////
        // CORE BUSINESS                  //
        ////////////////////////////////////
        irc.on(/^:([^!@]+).*[^C,]PRIVMSG([^\:]+):(.+)$/, function(info) {
            var user = info[1];
            var channel = info[2];
            var data = info[3];
            var match;


            if (!(/^.*#.*$/.test(channel))) {
                irc.speak("PRIVMSG " + user + " :" + "* I AM KATHINKA-BOT *");
                return;
            }

            if  (match = data.match(/^[Kk]athinka(-bot)?(.*)$/)) {
                // notify kathinka
            }

            // Tell user goodbye
            if (/^(le'?ah)|(sl[ea][ea]p)|(later)|((wel)?te?rusten?)$/.test(data)) {
                irc.speak("PRIVMSG " + channel + " :" + data + ", " + user);
                return;
            }

            // I AM KATHINKA
            if (/^.*[Kk]athinka.*$/.test(data)) {
                irc.speak("PRIVMSG " + channel + " :" + "* I AM KATHINKA-BOT *");
                return;
            }
        });

        irc.on(/^:([^!@]+).*[^C,]JOIN[^#]+(#.+)$/, function(info) {
            var user = info[1];
            var channel = info[2];
            if (user != config.user.nick) {
                irc.raw("PRIVMSG " + channel + " :moi " + user);
            }
        });

        ////////////////////////////////////
        // IRC INTERNALS                  //
        ////////////////////////////////////

        // wacht heel even voor je de NICK informatie stuurt
        setTimeout(function() {
            irc.raw('NICK ' + config.user.nick);
            irc.raw('USER ' + config.user.user + ' 8 * :' + config.user.real);
        }, 500);
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

module.exports = BotNetwork;