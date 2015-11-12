import SayMyName from '../../src/Interactions/SayMyName.js';
import should from 'should';

describe("Say my name interaction", function() {
    let sayMyName = new SayMyName;
    let sender = "Mark";

    it("Kathinka inroduces herself when she is mentioned", function() {
        let response = sayMyName.interact("Wie is kathinka?", sender);
        response.should.equal("* I AM KATHINKA-BOT *");

        response = sayMyName.interact("Wie is Kathinka-bot?", sender);
        response.should.equal("* I AM KATHINKA-BOT *");
    });

    it("Stays silent if she isn't mentioned", function() {
        let message = sayMyName.interact("Een nutteloos bericht", sender);
        (message === undefined).should.be.true;
    });
});