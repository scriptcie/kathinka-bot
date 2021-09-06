#!/usr/bin/env node
var buildKathinka = require('../src/Helpers/KathinkaFactory');
var BotNet = require('../src/BotNet.js');
var irc = require('irc');
var Telegram = require('../src/Telegram.js');
var Steam = require('../src/Steam.js');
var Message = require('../src/Message.js');

var fs = require('fs');

var nconf = require('nconf');
nconf.argv()
   .env()
   .file({ file: 'config.json' });
var kathinka = buildKathinka(fs);

var username = nconf.get('irc_username');
var password = nconf.get('irc_password');
var client = new irc.Client('irc.libera.chat', username, {
    debug: true,
    showErrors: true,
    autoRejoin: true,
    autoConnect: true,
    channels: ['#script?cie'],
    password: password,
});

// Adding some circular references in the bus to itself, so this probably
// causes memory leaks or something
var botNet = new BotNet(client, [kathinka]);
kathinka.bus.addInterface(Message.Type.IRC, botNet);

var telegram = new Telegram({
    token: nconf.get('telegram_token'),
}, [kathinka]);
kathinka.bus.addInterface(Message.Type.Telegram, telegram);

var steam = new Steam({
    username: nconf.get('steam_username'),
    password: nconf.get('steam_password'),
}, [kathinka]);
kathinka.bus.addInterface(Message.Type.Steam, steam);
