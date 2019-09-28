var Meeting = require ('../../src/Interactions/Meeting.js');
var Message = require('../../src/Message.js');
var MessageBus = require('../../src/MessageBus.js');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);

describe("Meeting interaction", function() {
    var sender = "Mark";
    var meeting;

    afterEach(function() {
        //Make sure timers are destroyed
        var clock = sinon.useFakeTimers();
        meeting.started = false;
        clock.tick(5 * 60 * 1000);
        clock.restore();
    });

    it("Can't start a meeting when the agenda is not set", function() {
        meeting = new Meeting({properties: {}});
        var response = meeting.interact("Kathinka, start meeting", sender);

        (response === undefined).should.be.true;
        meeting.started.should.be.false;
    });

    it("Starts a meeting when the agenda is set", function() {
        meeting = new Meeting({properties: {'agenda': ['test']}});
        meeting.started.should.be.false;

        var response = meeting.interact("Kathinka, start meeting", sender);
        (response === undefined).should.be.false;
        meeting.started.should.be.true;
    });

    it("Stops a meeting when one is started", function() {
        meeting = new Meeting({properties: {'agenda': ['test']}});
        meeting.started.should.be.false;

        var response = meeting.interact("Kathinka, start meeting", sender);
        meeting.started.should.be.true;

        response = meeting.interact("Kathinka, stop meeting", sender);
        (response === undefined).should.be.false;
        response.should.equal("End of the meeting");
        meeting.started.should.be.false;
    });

    it("Prints the agenda after starting", function() {
        meeting = new Meeting({properties: {'agenda': 'test'}});
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

    it("Prints the agenda when asked for", function() {
        meeting = new Meeting({properties: {'agenda': 'test'}});
        meeting.started.should.be.false;

        var expected = ['1. Opening', '2. Vaststellen agenda',
                        '3. test', '4. W.v.t.t.k',
                        '5. Rondvraag', '6. Sluiting'];
        var response = meeting.interact("Kathinka, agenda", sender);
        (response === undefined).should.be.false;
        response.length.should.equal(expected.length);

        for (var i = 0; i < expected.length; i++) {
            response[i].should.equal(expected[i]);
        }
    });

    it("Prints the agenda after starting with multiple elements", function() {
        meeting = new Meeting({properties: {'agenda': ['test 1', 'test 2']}});
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
        meeting = new Meeting({properties: {'agenda': 'test'}});
        meeting.started.should.be.false;

        var response = meeting.interact("Kathinka, start meeting", sender);

        response = meeting.interact("Kathinka, next", sender);
        (response === undefined).should.be.false;
        response.should.equal("2. Vaststellen agenda");

        response = meeting.interact("Kathinka, next", sender);
        (response === undefined).should.be.false;
        response.should.equal("3. test");
    });

    it("Stops the meeting when done", function() {
        meeting = new Meeting({properties: {'agenda': 'test'}});
        meeting.started.should.be.false;
        
        var expected = ['2. Vaststellen agenda',
                        '3. test', '4. W.v.t.t.k',
                        '5. Rondvraag', '6. Sluiting'];

        meeting.interact("Kathinka, start meeting", sender);
        for (var i = 0; i < expected.length; i++) {
            var response = meeting.interact("Kathinka, next", sender);
            (response === undefined).should.be.false;
            response.should.equal(expected[i]);
        }

        var lastResponse = meeting.interact("Kathinka, next", sender);
        (lastResponse === undefined).should.be.false;
        lastResponse.should.equal("End of the meeting");
    });

    it("does nothing when calling next when a meeting is not started", function() {
        meeting = new Meeting({properties: {'agenda': 'test'}});
        meeting.started.should.be.false;
        meeting.index.should.equal(0);

        var response = meeting.interact("Kathinka, next", sender);
        (response === undefined).should.be.true;
        meeting.index.should.equal(0);
    });

    it("Goes to the next item after 5 minutes of inactivity", test(function() {
        meeting = new Meeting({properties: {'agenda': 'test'}}, new MessageBus({}));
        var clock = sinon.useFakeTimers();
        meeting.interact("Kathinka, start meeting", sender);

        // After 2 minutes nothing should happen
        clock.tick(2 * 60 * 1000);
        meeting.index.should.equal(0);
        meeting.interact("say something", sender);

        // After 3 more minutes we should still be there because someone
        // said something 3 minutes ago
        clock.tick(3 * 60 * 1000);
        meeting.index.should.equal(0);

        // After 2 more minutes we had 5 minutes of inactivity so we should be
        // at the next item
        clock.tick(2 * 60 * 1000);
        meeting.index.should.equal(1);

        // and after 5 more minutes at the 3rd
        clock.tick(5 * 60 * 1000);
        meeting.index.should.equal(2);

        clock.restore();
    }));

    it("Gets a message after 5 minutes of inactivity", test(function() {
        var bus = new MessageBus({});
        var stubbedInterface = {say: function(to, messages) {
            messages[0].should.eql("2. Vaststellen agenda");
            to.should.eql("Mark");
        }};
        bus.addInterface(Message.Type.IRC, stubbedInterface);

        var clock = sinon.useFakeTimers();
        meeting = new Meeting({properties: {'agenda': 'test'}}, bus);

        var message = new Message(Message.Type.IRC, "Kathinka, start meeting", sender);
        meeting.interact(message, sender);

        clock.tick(5 * 60 * 1000);
        meeting.index.should.equal(1);
        clock.restore();
    }));

    it("ends the meeting after the last timeout", test(function() {
        var bus = new MessageBus({});

        var clock = sinon.useFakeTimers();
        meeting = new Meeting({properties: {'agenda': 'test'}}, bus);

        var message = new Message(Message.Type.IRC, "Kathinka, start meeting", sender);
        meeting.interact(message, sender);
        meeting.index = 5;

        clock.tick(5 * 60 * 1000);
        meeting.started.should.be.false;
        clock.restore();
    }));
});
