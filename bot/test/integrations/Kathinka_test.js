var Kathinka = require('../../src/Kathinka.js');
var Eightball = require ('../../src/Interactions/Eightball.js');
var Goodbye = require ('../../src/Interactions/Goodbye.js');
var Logging = require ('../../src/Interactions/Logging.js');

var askForAdvice = require('../../src/helpers/isAQuestion.js');


describe("A Kathinka bot with basic interactions", function() {
    var kathinka = new Kathinka([
        new Goodbye,
        new Eightball(askForAdvice),
        new Logging
    ]);

    it("Starts to do some logging", function() {
        kathinka.notify(
            "Kathinka start logging",
            "Mark", function(response) {
                response.should.equal("Started logging");
        });
    });

    it ("Responds with eightball questions", function() {
        kathinka.notify(
            "Kathinka wat is het nut van het leven?",
            "Mark", function(response) {
                response.should.equal("Concentrate and ask again");
        });
    });

    it("Says goodbye", function() {
        kathinka.notify(
            "welterusten",
            "Mark", function(response) {
                response.should.equal("welterusten Mark");
        });
    });

    it("Shows all messages that were logged", function() {
        kathinka.notify(
            "Kathinka show logs",
            "Mark", function(response) {
                response.should.eql([
                    "Mark said: \"Kathinka wat is het nut van het leven?\"",
                    "Mark said: \"welterusten\""
                ]);
        });
    });

});