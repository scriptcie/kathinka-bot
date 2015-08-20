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

    it("Will return a message if the sender asks for advice", function() {
        var eightball = new Eightball({});
        var sender = "Mark";

        var response = eightball.interact("Kathinka, is this a question?", sender);
        (response === undefined).should.be.false;
    });

    it("Won't return a message if the sender does not ask for advice", function() {
        var eightball = new Eightball({});
        var sender = "Mark";

        var response = eightball.interact("Some message", sender);
        (response === undefined).should.be.true;
    });

    it("Won't return a message if the sender does not adress Kathinka", function() {
        var eightball = new Eightball({});
        var sender = "Mark";

        var response = eightball.interact("Some message?", sender);
        (response === undefined).should.be.true;
    });

    it("Eightball's reactions are not random", function() {
        var eightball = new Eightball({});
        var sender = "Mark";
        var message = "Kathinka, something something?";

        var aResponse = eightball.interact(message, sender);
        eightball.interact(message, sender)
            .should.equal(aResponse);

        eightball.interact(message, sender)
            .should.equal(aResponse);
    });
});
