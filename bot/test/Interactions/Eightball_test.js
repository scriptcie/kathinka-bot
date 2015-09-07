var Eightball = require ('../../src/Interactions/Eightball.js');

describe("The eightball interaction", function() {

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
