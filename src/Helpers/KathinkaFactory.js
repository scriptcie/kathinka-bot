import SayMyName from '../Interactions/SayMyName.js';

import Kathinka from '../Kathinka.js';
import Eightball from '../Interactions/Eightball.js';
import Goodbye from '../Interactions/Goodbye.js';
import Logging from '../Interactions/Logging.js';
import Properties from '../Interactions/Properties.js';
import Actiepuntjes from '../Interactions/Actiepuntjes.js';
import Issues from '../Interactions/Issues.js';
import Meeting from '../Interactions/Meeting.js';
import Language from '../Interactions/Language.js';
import Quit from '../Interactions/Quit.js';

import MessageBus from '../MessageBus.js';
import fs from 'fs';
import Github from './Github';

let KathinkaFactory = function(client) {



    let dataStore;
    try {
        dataStore = require('../../data.json');
    } catch(err) {
        dataStore = {
            logging: {},
            properties: {},
            actiepuntjes: {},
            language: 'english',
        };
    }

    setInterval(function(){
        fs.writeFile('data.json', JSON.stringify(dataStore));
    }, 60000);

    let bus = new MessageBus({});
    let github = new Github;

    let kathinka = new Kathinka([
        new SayMyName,
        new Language(dataStore),
        new Goodbye,

        new Eightball(dataStore),
        new Logging(dataStore),
        new Properties(dataStore),
        new Meeting(dataStore, bus),
        new Issues(github, bus),
        new Actiepuntjes(dataStore),

        new Quit(client),
    ], bus);

    return kathinka;
}

module.exports = KathinkaFactory;
