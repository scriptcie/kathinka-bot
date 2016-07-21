var Message = require ('../src/Message.js');
var MessageBus = require('../src/MessageBus.js');
var sinon = require('sinon');

describe("MessageBus", function() {
    after(function () {
        console.log.restore();
    });

    it("can register interfaces", function() {
        var interfaces = {};
        var bus = new MessageBus(interfaces);
        var stubbedInterface = {say: function() {
        }};

        bus.addInterface(Message.Type.Null, stubbedInterface);

        var expected = {};
        expected[Message.Type.Null] = stubbedInterface;
        interfaces.should.eql(expected);
    });

    it("can communicate through registered interfaces", function(done) {
        var interfaces = {};
        var bus = new MessageBus(interfaces);
        var stubbedInterface = {say: function(to, messages) {
            messages.should.eql(['test']);
            done();
        }};

        bus.addInterface(Message.Type.Null, stubbedInterface);
        var message = new Message(Message.Type.Null, 'test', 'Mark');
        bus.add(message);
    });

    it("can not communicate through unregistered interfaces", function() {
        sinon.stub(console, 'log');

        var interfaces = {};
        var bus = new MessageBus(interfaces);
        var stubbedInterface = {say: function() {
        }};

        bus.addInterface(Message.Type.IRC, stubbedInterface);
        var message = new Message(Message.Type.Null, 'test', 'Mark');
        bus.add(message);

        console.log.calledOnce.should.be.true;
        console.log.calledWithMatch('No interface found for a message of type Null').should.be.true;
    });
});
