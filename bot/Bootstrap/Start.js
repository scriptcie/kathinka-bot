#!/usr/bin/env node

// Build kathinka bot with some interactions
function buildKathinka(client) {
    var Kathinka = require('../src/Kathinka.js');
    var Eightball = require('../src/Interactions/Eightball.js');
    var Goodbye = require('../src/Interactions/Goodbye.js');
    var Logging = require('../src/Interactions/Logging.js');
    var SayMyName = require('../src/Interactions/SayMyName.js');
    var Properties = require('../src/Interactions/Properties.js');
    var Meeting = require('../src/Interactions/Meeting.js');
    var Quit = require('../src/Interactions/Quit.js');
    var Actiepuntjes = require('../src/Interactions/Actiepuntjes.js');

    var askForAdvice = require('../src/Helpers/IsAQuestion.js');

    var dataStore = {
        logging: {},
        properties: {},
    };

    var kathinka = new Kathinka([
        new SayMyName,
        new Goodbye,
        new Eightball(askForAdvice),
        new Logging(dataStore.logging),
        new Properties(dataStore.properties),
        new Meeting(dataStore.properties),
        new Quit(client),
        new Actiepuntjes,
    ]);

    return kathinka;
}

var username = process.argv[2] || "Kathinka-Bot-test";
var password = process.argv[3] || "";

var irc = require('irc');
var client = new irc.Client('irc.freenode.net', username, {
    debug: true,
    channels: ['#script?cie'],
    password: password,
});

var BotNet = require('../src/BotNet.js');

var kathinka = buildKathinka(client);
var botNet = new BotNet(client, [kathinka]);
