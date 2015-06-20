var SayMyName = require ('../../src/Interactions/SayMyName.js');

describe("Say my name interaction", function() {
    var sayMyName = new SayMyName;
    var sender = "Mark";

    it("Kathinka inroduces herself when she is mentioned", function() {
        var response = sayMyName.interact("Wie is kathinka?", sender);
        response.should.equal("* I AM KATHINKA-BOT *");

        var response = sayMyName.interact("Wie is Kathinka-bot?", sender);
        response.should.equal("* I AM KATHINKA-BOT *");
    });

    it("Stays silent if she isn't mentioned", function() {
        var message = sayMyName.interact("Een nutteloos bericht", sender);
        (message === undefined).should.be.true;
    });
});