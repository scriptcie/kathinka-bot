var SteamAPI = require('steam');
var Message = require('./Message.js');

var Steam = function(config, bots) {
    this.client = new SteamAPI.SteamClient();
    this.user = new SteamAPI.SteamUser(this.client);
    this.friends = new SteamAPI.SteamFriends(this.client);

    this.config = config;
    this.bots = bots;

    this.connect();

    var self = this;

    this.client.on('connected', function() {
        self.logOn();
    });

    this.client.on('logOnResponse', function(response) {
        if (response.eresult == SteamAPI.EResult.OK) {
            console.log((new Date()) + "\tLogged in on Steam");
            self.friends.setPersonaState(SteamAPI.EPersonaState.Online);
        }
    });

    this.client.on('error', function(error) {
        console.log((new Date()) + "\tSteam error: " + error);
        if (!self.client.connected || !self.client.loggedOn) {
            self.reconnect = setTimeout(function() {
                self.connect();
            }, 60000);
        }
    });

    this.friends.on('personaState', function(friend) {
        if (friend.game_name !== '' &&
            friend.friendid in self.friends.personaStates &&
            self.friends.personaStates[friend.friendid].game_name !==
            friend.game_name) {
            self.friends.sendMessage(friend.friendid, 'Ga eens coden vent!');
        }
    });

    this.friends.on('message', function(source, message) {
        console.log((new Date()) + "\tReceived message on Steam: " + message);
        self.handle(self.friends.personaStates[source].player_name, source, message);
    });
};

Steam.prototype = {
    handle: function(from, to, message) {
        var self = this;
        for (var i = 0; i < this.bots.length; i++) {
            var messageObj = new Message(Message.Type.Steam, message, to);
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
        setTimeout(function() {
            self.friends.sendMessage(to, message, SteamAPI.EChatEntryType.ChatMsg);
            self.say(to, messages);
        }, message.length * (25 + 25 * Math.random()));
    },

    logOn: function() {
        this.user.logOn({
            account_name: this.config.username.replace(/\W/g, ''),
            password: this.config.password,
        });
    },

    connect: function() {
        console.log((new Date()) + "\tTrying to connect");
        this.reconnect = null;
        this.client.connect();
    },

    quit: function() {
        if (this.reconnect) {
            clearTimeout(this.reconnect);
            this.reconnect = null;
        }
        this.client.disconnect();
    },
};

module.exports = Steam;
