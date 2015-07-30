var KathinkaFactory = function(client) {
    var Kathinka = require('../Kathinka.js');
    var Eightball = require('../Interactions/Eightball.js');
    var Goodbye = require('../Interactions/Goodbye.js');
    var Logging = require('../Interactions/Logging.js');
    var SayMyName = require('../Interactions/SayMyName.js');
    var Properties = require('../Interactions/Properties.js');
    var Actiepuntjes = require('../Interactions/Actiepuntjes.js');
    var Language = require('../Interactions/Language.js');
    var Quit = require('../Interactions/Quit.js');

    var askForAdvice = require('../Helpers/IsAQuestion.js');

    fs = require('fs');

    var dataStore;
    try {
        dataStore = require('../../Bootstrap/data.json');
    } catch(err) {
        dataStore = {
            logging: {},
            properties: {},
            actiepuntjes: {},
            language: 'english'
        };
    }

    setInterval(function(){
        fs.writeFile('data.json', JSON.stringify(dataStore));
    },60000)

    var kathinka = new Kathinka([
        new SayMyName,
        new Language(dataStore),
        new Goodbye,
        new Eightball(dataStore),
        new Logging(dataStore),
        new Properties(dataStore),
        new Actiepuntjes,
        new Quit(client),
    ]);

    return kathinka;
}

module.exports = KathinkaFactory;
