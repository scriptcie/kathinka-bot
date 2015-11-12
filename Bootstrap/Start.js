#!/usr/bin/env node
import buildKathinka from '../src/Helpers/KathinkaFactory';
import BotNet from '../src/BotNet.js';
import irc from 'irc';
import Telegram from '../src/Telegram.js';
import Steam from '../src/Steam.js';
import Message from '../src/Message.js';
import nconf from 'nconf';

nconf.argv()
   .env()
   .file({ file: __dirname + '/../config.json' });

var username = nconf.get('irc_username');
var password = nconf.get('irc_password');
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

var telegram = new Telegram({
    token: nconf.get('telegram_token')
}, [kathinka]);
kathinka.bus.addInterface(Message.Type.Telegram, telegram);

var steam = new Steam({
    username: nconf.get('steam_username'),
    password: nconf.get('steam_password')
}, [kathinka]);
kathinka.bus.addInterface(Message.Type.Steam, steam);
