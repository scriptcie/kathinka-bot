#!/usr/bin/env node
var buildKathinka = require('../src/Helpers/KathinkaFactory');
var BotNet = require('../src/BotNet.js');
var irc = require('irc');
var Telegram = require('../src/Telegram.js');
var Steam = require('../src/Steam.js');

var Message = require('../src/Message.js');

var username = process.argv[2] || "Kathinka-Bot-test";
var password = process.argv[3] || "";
var token = process.argv[4] || "";

var client = new irc.Client('irc.freenode.net', username, {
    debug: true,
    showErrors: true,
    autoRejoin: true,
    autoConnect: true,
    channels: ['#script?cie'],
    password: password,
});

var kathinka = buildKathinka(client);

// Adding some circular references in the bus to itself, so this probably
// causes memory leaks or something
var botNet = new BotNet(client, [kathinka]);
kathinka.bus.addInterface(Message.Type.IRC, botNet);

var telegram = new Telegram({token: token}, [kathinka]);
kathinka.bus.addInterface(Message.Type.Telegram, telegram);

var steam = new Steam({username: username, password: password}, [kathinka]);
kathinka.bus.addInterface(Message.Type.Steam, steam);
