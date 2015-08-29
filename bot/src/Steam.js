var SteamAPI = require('steam');

var Steam = function(config, bots) {
    this.client = new SteamAPI.SteamClient();
    this.user = new SteamAPI.SteamUser(this.client);
    this.friends = new SteamAPI.SteamFriends(this.client);

    this.bots = bots;

    this.client.connect();

    var self = this;

    this.client.on('connected', function() {
        self.user.logOn({
            account_name: config.username.replace(/\W/g, ''),
            password: config.password
        });
    });

    this.client.on('logOnResponse', function() {
        console.log('Logged in on Steam');
        self.friends.setPersonaState(SteamAPI.EPersonaState.Online);
    });

    this.friends.on('personaState', function(friend) {
        if (friend.game_name !== '' &&
            friend.friendid in self.friends.personaStates &&
            self.friends.personaStates[friend.friendid].game_name !==
            friend.game_name) {
            self.friends.sendMessage(friend.friendid, 'Ga eens coden vent!');
        }
    });

    this.friends.on('message', function(source, message, type, chatter) {
        console.log('Received message on steam: ' + message);
        self.handle(self.friends.personaStates[source].player_name, source, message);
    });
};

Steam.prototype = {
    handle: function(from, to, message) {
        var self = this;
        for (var i = 0; i < this.bots.length; i++) {
            this.bots[i].notify(message, from, function(messages) {
                self.speakMessages(to, messages);
            });
        };
    },

    speakMessages: function(to, messages) {
        if (messages === undefined || messages.length === 0) {
            return;
        }

        var self = this;
        var message = messages.shift();
        setTimeout(function() {
            self.friends.sendMessage(to, message, SteamAPI.EChatEntryType.ChatMsg);
            self.speakMessages(to, messages);
        }, message.length * (25 + 25 * Math.random()));
    },
};

module.exports = Steam;
