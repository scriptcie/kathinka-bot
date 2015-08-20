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

    var state = {
        logging: {},
        properties: {},
        language: 'english'
    };

    var kathinka = new Kathinka([
        new SayMyName,
        new Language(state),
        new Goodbye,
        new Eightball(state),
        new Logging(state),
        new Properties(state),
        new Actiepuntjes,
        new Quit(client),
    ]);

    return kathinka;
}

module.exports = KathinkaFactory;
