var Meeting = require ('../../src/Interactions/Meeting.js');
var sinon = require('sinon');

describe("Meeting interaction", function() {
    var sender = "Mark";

    it("Can't start a meeting when the agenda is not set", function() {
        var meeting = new Meeting({});;
        var response = meeting.interact("Kathinka, start meeting", sender);

        (response === undefined).should.be.true;
        meeting.started.should.be.false;
    });

    it("Starts a meeting when the agenda is set", function() {
        var meeting = new Meeting({'agenda': ['test']});
        meeting.started.should.be.false;

        var response = meeting.interact("Kathinka, start meeting", sender);
        (response === undefined).should.be.false;
        meeting.started.should.be.true;
    });

    it("Stops a meeting when one is started", function() {
        var meeting = new Meeting({'agenda': ['test']});
        meeting.started.should.be.false;

        var response = meeting.interact("Kathinka, start meeting", sender);
        meeting.started.should.be.true;

        response = meeting.interact("Kathinka, stop meeting", sender);
        (response === undefined).should.be.false;
        response.should.equal("End of the meeting");
        meeting.started.should.be.false;
    });

    it("Prints the agenda after starting", function() {
        var meeting = new Meeting({'agenda': 'test'});
        meeting.started.should.be.false;

        var expected = ['Staring meeting', 'Agenda:', '1. Opening',
                        '2. Vaststellen agenda', '3. test', '4. W.v.t.t.k',
                        '5. Rondvraag', '6. Sluiting'];
        var response = meeting.interact("Kathinka, start meeting", sender);
        (response === undefined).should.be.false;
        response.length.should.equal(expected.length);

        for (var i = 0; i < expected.length; i++) {
            response[i].should.equal(expected[i]);
        }
    });

    it("Prints the agenda after starting with multiple elements", function() {
        var meeting = new Meeting({'agenda': ['test 1', 'test 2']});
        meeting.started.should.be.false;

        var expected = ['Staring meeting', 'Agenda:', '1. Opening',
                        '2. Vaststellen agenda', '3. test 1', '4. test 2',
                        '5. W.v.t.t.k', '6. Rondvraag', '7. Sluiting'];
        var response = meeting.interact("Kathinka, start meeting", sender);
        (response === undefined).should.be.false;
        response.length.should.equal(expected.length);

        for (var i = 0; i < expected.length; i++) {
            response[i].should.equal(expected[i]);
        }
    });

    it("Goes to the next item after receiving next", function() {
        var meeting = new Meeting({'agenda': 'test'});
        meeting.started.should.be.false;

        var response = meeting.interact("Kathinka, start meeting", sender);

        response = meeting.interact("Kathinka, next", sender);
        (response === undefined).should.be.false;
        response.should.equal("2. Vaststellen agenda");

        response = meeting.interact("Kathinka, next", sender);
        (response === undefined).should.be.false;
        response.should.equal("3. test");
    });

    it("Goes to the next item after 5 minutes of inactivity", sinon.test(function() {
        var meeting = new Meeting({'agenda': 'test'});
        var response = meeting.interact("Kathinka, start meeting", sender);
        var clock = sinon.useFakeTimers();

        // After 2 minutes nothing should happen
        clock.tick(2 * 60 * 1000);
        meeting.index.should.equal(0);
        var response = meeting.interact("say something", sender);

        // After 3 more minutes we should still be there because someone
        // said something 3 minutes ago
        clock.tick(3 * 60 * 1000);
        meeting.index.should.equal(0);

        // After 2 more minutes we had 5 minutes of inactivity so we should be
        // at the next item
        clock.tick(2 * 60 * 1000);
        meeting.index.should.equal(1);
        clock.restore();
    }));
});