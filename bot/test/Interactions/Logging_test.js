var Logging = require ('../../src/Interactions/Logging.js');

function someLogger() {
    return new Logging;
}

describe("The logging interaction", function() {
    var sender = "Mark";

    it("Does nothing when its not asked something", function() {
        var logging = someLogger();
        var response = logging.interact("Moi", sender);
        console.log(response);
        (response === null).should.be.true;
    });

    it("Starts logging when asked to log a conversation", function() {
        var logging = someLogger();
        var response = logging.interact("Kathinka start logging", sender);
        response.should.equal("Started logging");

        logging.interact("Hello", sender);
        logging.interact("World", sender);

        logging.log.length.should.equal(2);
        logging.log[0].should.equal("Hello");
        logging.log[1].should.equal("World");
    });

    it("Notifies if its already logging", function() {
        var logging = someLogger();
        logging.interact("Kathinka start logging", sender);
        var response = logging.interact("Kathinka start logging", sender);
        response.should.equal("I'm already logging");
    });

    it("Can be commanded to stop logging", function() {
        var logging = someLogger();
        logging.interact("Kathinka start logging", sender);
        var response = logging.interact("Kathinka stop logging", sender);
        response.should.equal("Ok, Mark I've stopped logging");
    });

    it("Wont stop logging if its already stopped logging", function() {
        var logging = someLogger();
        var response = logging.interact("Kathinka stop logging", sender);
        response.should.equal("I haven't been logging");
    });

    // it("The log files are empty upon initialization", function() {
    //     var logging = new Logging;


    // });


    // it should start logging when an meeting is started
    // note: dit doen met observer dispatcher
});