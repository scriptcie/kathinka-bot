var KathinkaFactory = function(client) {
    var Kathinka = require('../Kathinka.js');
    var Eightball = require('../Interactions/Eightball.js');
    var Goodbye = require('../Interactions/Goodbye.js');
    var Logging = require('../Interactions/Logging.js');
    var SayMyName = require('../Interactions/SayMyName.js');
    var Properties = require('../Interactions/Properties.js');
    var Actiepuntjes = require('../src/Interactions/Actiepuntjes.js');
    var Quit = require('../Interactions/Quit.js');

    var askForAdvice = require('../Helpers/IsAQuestion.js');

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
        new Actiepuntjes,
        new Quit(client),
    ]);

    return kathinka;
}

module.exports = KathinkaFactory;