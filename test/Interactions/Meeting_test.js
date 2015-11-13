import Meeting from '../../src/Interactions/Meeting.js';
import Message from '../../src/Message.js';
import MessageBus from '../../src/MessageBus.js';
import sinon from 'sinon';

describe("Meeting interaction", function() {
    let sender = "Mark";
    var clock;

    beforeEach(function() {
        clock = sinon.useFakeTimers();
    })

    afterEach(function() {
        // let clock = sinon.useFakeTimers();
        clock.restore();
    });

    it("Can't start a meeting when the agenda is not set", function() {
        let meeting = new Meeting({properties: {}});
        let response = meeting.interact("Kathinka, start meeting", sender);

        (response === undefined).should.be.true;
        meeting.started.should.be.false;
    });

    it("Starts a meeting when the agenda is set", function() {
        let meeting = new Meeting({properties: {'agenda': ['test']}});
        meeting.started.should.be.false;

        let response = meeting.interact("Kathinka, start meeting", sender);
        (response === undefined).should.be.false;
        meeting.started.should.be.true;
    });

    it("Stops a meeting when one is started", function() {
        let meeting = new Meeting({properties: {'agenda': ['test']}});
        meeting.started.should.be.false;

        let response = meeting.interact("Kathinka, start meeting", sender);
        meeting.started.should.be.true;

        response = meeting.interact("Kathinka, stop meeting", sender);
        (response === undefined).should.be.false;
        response.should.equal("End of the meeting");
        meeting.started.should.be.false;
    });

    it("Prints the agenda after starting", function() {
        let meeting = new Meeting({properties: {'agenda': 'test'}});
        meeting.started.should.be.false;

        let expected = ['Staring meeting', 'Agenda:', '1. Opening',
                        '2. Vaststellen agenda', '3. test', '4. W.v.t.t.k',
                        '5. Rondvraag', '6. Sluiting'];
        let response = meeting.interact("Kathinka, start meeting", sender);
        (response === undefined).should.be.false;
        response.length.should.equal(expected.length);

        for (let i = 0; i < expected.length; i++) {
            response[i].should.equal(expected[i]);
        }
    });

    it("Prints the agenda after starting with multiple elements", function() {
        let meeting = new Meeting({properties: {'agenda': ['test 1', 'test 2']}});
        meeting.started.should.be.false;

        let expected = ['Staring meeting', 'Agenda:', '1. Opening',
                        '2. Vaststellen agenda', '3. test 1', '4. test 2',
                        '5. W.v.t.t.k', '6. Rondvraag', '7. Sluiting'];
        let response = meeting.interact("Kathinka, start meeting", sender);
        (response === undefined).should.be.false;
        response.length.should.equal(expected.length);

        for (let i = 0; i < expected.length; i++) {
            response[i].should.equal(expected[i]);
        }
    });

    it("Goes to the next item after receiving next", function() {
        let meeting = new Meeting({properties: {'agenda': 'test'}});
        meeting.started.should.be.false;

        let response = meeting.interact("Kathinka, start meeting", sender);

        response = meeting.interact("Kathinka, next", sender);
        (response === undefined).should.be.false;
        response.should.equal("2. Vaststellen agenda");

        response = meeting.interact("Kathinka, next", sender);
        (response === undefined).should.be.false;
        response.should.equal("3. test");
    });

    it("Goes to the next item after 5 minutes of inactivity", sinon.test(function() {
        let meeting = new Meeting({properties: {'agenda': 'test'}}, new MessageBus({}));
        let clock = sinon.useFakeTimers();
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

    it("Gets a message after 5 minutes of inactivity", sinon.test(function() {
        let bus = new MessageBus({});
        let stubbedInterface = {say: function(to, messages) {
            messages[0].should.eql("2. Vaststellen agenda");
            to.should.eql("Mark");
        }};
        bus.addInterface(Message.Type.IRC, stubbedInterface);

        let clock = sinon.useFakeTimers();
        let meeting = new Meeting({properties: {'agenda': 'test'}}, bus);

        let message = new Message(Message.Type.IRC, "Kathinka, start meeting", sender);
        meeting.interact(message, sender);

        clock.tick(5 * 60 * 1000);
        meeting.index.should.equal(1);
        clock.restore();
    }));
});
