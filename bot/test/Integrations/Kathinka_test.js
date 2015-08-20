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
            "Kathinka what is the meaning of life?",
            "Mark", function(response) {
                response.should.eql(["Ask again later"]);
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
                    "Mark said: \"Kathinka what is the meaning of life?\"",
                    "Mark said: \"welterusten\""
                ]);
        });
    });

    it("Can answer questions in different languages", function() {
        kathinka.notify(
            "Kathinka does this work?",
            "Mark", function(response) {
                response.should.eql(["You may rely on it"]);
        });
        kathinka.notify(
            "Kathinka werkt dit?",
            "Mark", function(response) {
                response.should.eql(["Ja"]);
        });
    });

});
