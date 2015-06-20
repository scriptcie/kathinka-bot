var Eightball = require ('../../src/Interactions/Eightball.js');
var sinon = require('sinon');

describe("The eightball interaction", function() {

    // it("Tells a user a random message", sinon.test(function() {
    //     var eightball = new Eightball(function(message) { return true });
    //     var sender = "Mark";

    //     this.stub(Math, 'random').returns(0);
    //     var response = eightball.interact("Some message", sender);
    //     response.should.equal("It is certain");
    // }));

    // it("Tells a user another random message", sinon.test(function() {
    //     var eightball = new Eightball(function(message) { return true });
    //     var sender = "Mark";

    //     this.stub(Math, 'random').returns(1);
    //     var response = eightball.interact("Some message", sender);
    //     response.should.equal("Very doubtful");
    // }));

    it("Eightball's reactions are not random", function() {
        var eightball = new Eightball(function(message) { return true });
        var sender = "Mark";
        var message = "Something something";

        var aResponse = eightball.interact(message, sender);
        eightball.interact(message, sender)
            .should.equal(aResponse);

        eightball.interact(message, sender)
            .should.equal(aResponse);
    });

    it("Won't return a message if the sender does not ask for advice", function() {
        var eightball = new Eightball(function(message) { return false });
        var sender = "Mark";

        var response = eightball.interact("Some message", sender);
        (response === undefined).should.be.true;
    });
});