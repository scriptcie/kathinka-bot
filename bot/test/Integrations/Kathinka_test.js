var buildKathinka = require('../../src/Helpers/KathinkaFactory');

describe("A Kathinka bot with basic interactions", function() {

    var kathinka = new buildKathinka();

    it("Starts to do some logging", function() {
        kathinka.notify(
            "Kathinka start logging",
            "Mark", function(response) {
                response.should.eql(["Started logging"]);
        });
    });

    it ("Responds with eightball questions", function() {
        kathinka.notify(
            "Kathinka wat is het nut van het leven?",
            "Mark", function(response) {
                response.should.eql(["Concentrate and ask again"]);
        });
    });

    it("Says goodbye", function() {
        kathinka.notify(
            "welterusten",
            "Mark", function(response) {
                response.should.eql(["welterusten Mark"]);
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