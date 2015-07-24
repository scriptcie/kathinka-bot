var Meeting = require ('../../src/Interactions/Meeting.js');

describe("Meeting interaction", function() {
    var sender = "Mark";

    it("Can't start a meeting when the agenda is not set", function() {
        var meeting = new Meeting({});;
        var response = meeting.interact("start meeting", sender);

        (response === undefined).should.be.true;
    });
});
