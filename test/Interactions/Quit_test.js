var Quit = require ('../../src/Interactions/Quit.js');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);

describe("Quit interaction", function() {
    var sender = "Mark";

    it("Stops running when asked to stop", test(function() {
        var bus = { quit: function() {}};

        var quit = new Quit(bus);
        var clock = sinon.useFakeTimers();

        // We want to check if Kathinka exits herself.
        var subbedProcess = this.stub(process, 'exit').returns(undefined);

        var response = quit.interact("Kathinka af!", sender);
        (response === undefined).should.be.true;

        // The process should quit after some seconds such that we have time to tell
        // irc that we want to disconnect
        subbedProcess.calledOnce.should.be.false;
        clock.tick(2000);
        subbedProcess.calledOnce.should.be.true;
        clock.restore();
    }));

    it("Does not respond when not asked to stop", function() {
        var quit = new Quit;
        var response = quit.interact("Een bericht", sender);
        (response === undefined).should.be.true;
    });
});
