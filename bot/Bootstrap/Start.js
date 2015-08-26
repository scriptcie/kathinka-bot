#!/usr/bin/env node
var buildKathinka = require('../src/Helpers/KathinkaFactory');
var BotNet = require('../src/BotNet.js');
var irc = require('irc');
var Telegram = require('../src/Telegram.js');

var username = process.argv[2] || "Kathinka-Bot-test";
var password = process.argv[3] || "";
var token = process.argv[4] || ""

var client = new irc.Client('irc.freenode.net', username, {
    debug: true,
    showErrors: true,
    autoRejoin: true,
    autoConnect: true,
    channels: ['#script?cie'],
    password: password,
});

var kathinka = buildKathinka(client);
var botNet = new BotNet(client, [kathinka]);
var telegram = new Telegram({token: token}, [kathinka]);
