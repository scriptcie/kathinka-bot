var KathinkaFactory = function(fs) {
    var Kathinka = require('../Kathinka.js');
    var Broadcast = require('../Interactions/Broadcast.js');
    var Eightball = require('../Interactions/Eightball.js');
    var Goodbye = require('../Interactions/Goodbye.js');
    var Logging = require('../Interactions/Logging.js');
    var SayMyName = require('../Interactions/SayMyName.js');
    var Properties = require('../Interactions/Properties.js');
    var Actiepuntjes = require('../Interactions/Actiepuntjes.js');
    var Issues = require('../Interactions/Issues.js');
    var Meeting = require('../Interactions/Meeting.js');
    var Language = require('../Interactions/Language.js');
    var Quit = require('../Interactions/Quit.js');
    var Help = require('../Interactions/Help.js');

    var MessageBus = require('../MessageBus.js');
    var Github = require("./Github");

    var dataStore;
    try {
        dataStore = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    } catch(err) {
        dataStore = {
            logging: {},
            properties: {},
            actiepuntjes: {},
            language: 'english',
        };
    }

    setInterval(function() {
        fs.writeFile('data.json', JSON.stringify(dataStore),
                     function(err) {
                         if(err) {
                             return console.log(err);
                         }
                     });
    }, 60000);

    var bus = new MessageBus({});
    var github = new Github;

    var kathinka = new Kathinka([
        new SayMyName,
        new Language(dataStore),
        new Goodbye,

        new Broadcast(dataStore, bus),
        new Eightball(dataStore),
        new Logging(dataStore),
        new Properties(dataStore),
        new Meeting(dataStore, bus),
        new Issues(github, bus),
        new Actiepuntjes(dataStore),

        new Quit(bus),
        new Help(),
    ], bus);

    return kathinka;
}

module.exports = KathinkaFactory;
