import Eightball from '../../src/Interactions/Eightball.js';

describe("The eightball interaction", function() {

    it("Will return a message if the sender asks for advice", function() {
        let eightball = new Eightball({});
        let sender = "Mark";

        let response = eightball.interact("Kathinka, is this a question?", sender);
        (response === undefined).should.be.false;
    });

    it("Won't return a message if the sender does not ask for advice", function() {
        let eightball = new Eightball({});
        let sender = "Mark";

        let response = eightball.interact("Some message", sender);
        (response === undefined).should.be.true;
    });

    it("Won't return a message if the sender does not adress Kathinka", function() {
        let eightball = new Eightball({});
        let sender = "Mark";

        let response = eightball.interact("Some message?", sender);
        (response === undefined).should.be.true;
    });

    it("Eightball's reactions are not random", function() {
        let eightball = new Eightball({});
        let sender = "Mark";
        let message = "Kathinka, something something?";

        let aResponse = eightball.interact(message, sender);
        eightball.interact(message, sender)
            .should.equal(aResponse);

        eightball.interact(message, sender)
            .should.equal(aResponse);
    });
});
