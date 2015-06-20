#!/usr/bin/env node

// Build kathinka bot with some interactions
function buildKathinka() {
    var Kathinka = require('../src/Kathinka.js');
    var Eightball = require('../src/Interactions/Eightball.js');
    var Goodbye = require('../src/Interactions/Goodbye.js');
    var Logging = require('../src/Interactions/Logging.js');
    var SayMyName = require('../src/Interactions/SayMyName.js');
    var GetSet = require('../src/Interactions/GetSet.js');

    var askForAdvice = require('../src/Helpers/IsAQuestion.js');

    var dataStore = {};

    var kathinka = new Kathinka([
        new SayMyName,
        new Goodbye,
        new Eightball(askForAdvice),
        new Logging(dataStore),
        new GetSet({}),
    ]);

    return kathinka;
}

var irc = require('irc');
var client = new irc.Client('irc.freenode.net', 'Kathinka-2', {
    debug: true,
    channels: ['#script?cie']
});

var BotNet = require('../src/BotNet.js');

var kathinka = buildKathinka();
var botNet = new BotNet(client, [kathinka]);