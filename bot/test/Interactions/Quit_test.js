var Quit = require ('../../src/Interactions/Quit.js');
var sinon = require('sinon');

describe("Say my name interaction", function() {
    var quit = new Quit;
    var sender = "Mark";

    it("Stops running", sinon.test(function() {
        var clock = sinon.useFakeTimers();

        var subbedProcess = this.stub(process, 'exit').returns(0);
        var response = quit.interact("Kathinka af!", sender);
        response.should.equal("QUIT");

        subbedProcess.calledOnce.should.be.false;
        clock.tick(1000);
        subbedProcess.calledOnce.should.be.true;
        clock.restore();
    }));
});