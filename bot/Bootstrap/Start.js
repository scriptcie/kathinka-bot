#!/usr/bin/env node
var buildKathinka = require('../src/Helpers/KathinkaFactory');
var BotNet = require('../src/BotNet.js');
var irc = require('irc');

var username = process.argv[2] || "Kathinka-Bot-test";
var password = process.argv[3] || "";

var client = new irc.Client('irc.freenode.net', username, {
    debug: true,
    channels: ['#script?cie'],
    password: password,
});

var kathinka = buildKathinka(client);
var botNet = new BotNet(client, [kathinka]);