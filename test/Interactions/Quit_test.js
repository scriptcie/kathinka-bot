import Quit from '../../src/Interactions/Quit.js';
import sinon from 'sinon';

describe("Quit interaction", function() {
    let sender = "Mark";

    it("Stops running when asked to stop", sinon.test(function() {
        let client = { disconnect: function(message, callback) {
            callback();
        }};

        let quit = new Quit(client);
        let clock = sinon.useFakeTimers();

        // We want to check if Kathinka exits herself.
        let subbedProcess = this.stub(process, 'exit').returns(undefined);

        let response = quit.interact("Kathinka af!", sender);
        (response === undefined).should.be.true;

        // The process should quit after some seconds such that we have time to tell
        // irc that we want to disconnect
        subbedProcess.calledOnce.should.be.false;
        clock.tick(1000);
        subbedProcess.calledOnce.should.be.true;
        clock.restore();
    }));

    it("Does not respond when not asked to stop", function() {
        let quit = new Quit;
        let response = quit.interact("Een bericht", sender);
        (response === undefined).should.be.true;
    });
});