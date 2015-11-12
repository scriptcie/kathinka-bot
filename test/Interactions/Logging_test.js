import Logging from '../../src/Interactions/Logging.js';

function someLogger() {
    // a helper for if we want to provide a log repository for the logger
    return new Logging;
}

describe("The logging interaction", function() {
    let sender = "Mark";

    it("Does nothing when its not asked something", function() {
        let logging = someLogger();
        let response = logging.interact("Moi", sender);
        (response === undefined).should.be.true;
    });

    it("Starts logging when asked to log a conversation", function() {
        let logging = someLogger();
        let response = logging.interact("Kathinka start logging", sender);
        response.should.equal("Started logging");

        logging.interact("Hello", sender);
        logging.interact("World", sender);

        logging.log.length.should.equal(2);
        logging.log.should.eql([
            { message: "Hello", from: "Mark" },
            { message: "World", from: "Mark" },
        ]);
    });

    it("Notifies if its already logging", function() {
        let logging = someLogger();
        logging.interact("Kathinka start logging", sender);
        let response = logging.interact("Kathinka start logging", sender);
        response.should.equal("I'm already logging");
    });

    it("Can be commanded to stop logging", function() {
        let logging = someLogger();
        logging.interact("Kathinka start logging", sender);
        let response = logging.interact("Kathinka stop logging", sender);
        response.should.equal("Ok, Mark I've stopped logging");
    });

    it("Wont stop logging if its already stopped logging", function() {
        let logging = someLogger();
        let response = logging.interact("Kathinka stop logging", sender);
        response.should.equal("I haven't been logging");
    });

    it("Shows its current log when asked for", function() {
        let logging = someLogger();
        logging.interact("Kathinka start logging", sender);
        logging.interact("Hee hallo", sender);
        logging.interact("Moi", "Moi");

        let response = logging.interact("Kathinka show logs", "Mark");

        response.should.eql([
            "Mark said: \"Hee hallo\"",
            "Moi said: \"Moi\"",
        ]);
    });

    it("Logs messages that were interpreted as commands, but were not commands", function() {
        let logging = someLogger();
        logging.interact("Kathinka start logging", sender);
        logging.interact("Kathinka kan je dit voor me loggen?", sender);

        let response = logging.interact("Kathinka show logs", "Mark");

        response.should.eql([
            "Mark said: \"Kathinka kan je dit voor me loggen?\"",
        ]);
    });

    // it should start logging when an meeting is started
    // note: dit doen met observer dispatcher
});