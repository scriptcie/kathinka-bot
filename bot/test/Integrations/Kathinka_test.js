var buildKathinka = require('../../src/Helpers/KathinkaFactory');
var Message = require('../../src/Message.js');

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

    it("Can handle Message objects", function() {
        var message = new Message(Message.Type.IRC,
                                  "Kathinka does this work?",
                                  "Mark");
        kathinka.notify(message, "Mark", function(response) {
            response.should.eql(["You may rely on it"]);
        });
    });

    it("Can handle send messages through the bus", function() {
        var message = new Message(Message.Type.IRC,
                                  "Test",
                                  "Mark");
        var stubbedInterface = {say: function(to, messages) {
            messages[0].should.eql("Test");
            to.should.eql("Mark");
            }};
        kathinka.bus.addInterface(Message.Type.IRC, stubbedInterface);
        kathinka.bus.add(message);
    });

});
