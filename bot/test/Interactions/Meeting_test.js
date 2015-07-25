var Meeting = require ('../../src/Interactions/Meeting.js');

describe("Meeting interaction", function() {
    var sender = "Mark";

    it("Can't start a meeting when the agenda is not set", function() {
        var meeting = new Meeting({});;
        var response = meeting.interact("start meeting", sender);

        (response === undefined).should.be.true;
    });

    it("Starts a meeting when the agenda is set", function() {
        var meeting = new Meeting({'agenda': 'test'});
        meeting.started.should.be.false;

        var response = meeting.interact("Kathinka, start meeting", sender);
        (response === undefined).should.be.false;
        response.should.equal("Starting meeting");
        meeting.started.should.be.true;
    });

    it("Stops a meeting when one is started", function() {
        var meeting = new Meeting({'agenda': 'test'});
        meeting.started.should.be.false;

        var response = meeting.interact("Kathinka, start meeting", sender);
        meeting.started.should.be.true;

        response = meeting.interact("Kathinka, stop meeting", sender);
        (response === undefined).should.be.false;
        response.should.equal("Stopping meeting");
        meeting.started.should.be.false;
    });
});
