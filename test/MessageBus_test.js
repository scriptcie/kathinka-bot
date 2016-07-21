var Message = require ('../src/Message.js');
var MessageBus = require('../src/MessageBus.js');
var sinon = require('sinon');

describe("MessageBus", function() {

    it("can register interfaces", function() {
        var interfaces = {};
        var bus = new MessageBus(interfaces);
        var stubbedInterface = {say: function() {
        }};

        bus.addInterface(Message.Type.Null, stubbedInterface);

        var expected = {};
        expected[Message.Type.Null] = stubbedInterface;
        interfaces.should.eql(expected);
        bus.interfaces.should.eql(expected);
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

    it("can not communicate through unregistered interfaces", function(done) {
        sinon.stub(console, 'log');

        var interfaces = {};
        var bus = new MessageBus(interfaces);
        var stubbedInterface = {say: function() {
            console.log.calledOnce.should.be.true;
            console.log.calledWithMatch('No interface found for a message of type Null').should.be.true;
            console.log.restore();
            done();
        }};

        bus.addInterface(Message.Type.IRC, stubbedInterface);
        var message1 = new Message(Message.Type.Null, 'test', 'Mark');
        bus.add(message1);

        // Another message to check the returns from say
        var message2 = new Message(Message.Type.IRC, 'test', 'Mark');
        bus.add(message2);
    });

    it("can forward quit calls", function(done) {
        var interfaces = {};
        var bus = new MessageBus(interfaces);

        var stubbedInterface = {quit: function() {
            done();
        }};

        bus.addInterface(Message.Type.Null, stubbedInterface);
        bus.quit();
    });

    it("can handle quit callbacks", function(done) {
        var interfaces = {};
        var bus = new MessageBus(interfaces);

        var callback = function() {
            done();
        }

        bus.quit(callback);
    });

    it("removes interfaces after a quit", function() {
        var interfaces = {};
        var bus = new MessageBus(interfaces);

        var stubbedInterface = {quit: function() {
        }};

        bus.addInterface(Message.Type.Null, stubbedInterface);
        bus.quit();
        bus.interfaces.should.eql({});
    });

    it("locks when messages are being processed", function(done) {
        var interfaces = {};
        var bus = new MessageBus(interfaces);
        var first = true;

        var message = new Message(Message.Type.Null, 'test', 'Mark');

        var stubbedInterface = {say: function() {
            if (!first) {
                done();
                return;
            }

            first = false;
            bus.locked.should.be.true;
            bus.add(message);
            bus.queue.length.should.equal(1);
        }};

        bus.addInterface(Message.Type.Null, stubbedInterface);
        bus.add(message)
    });

    it("can handle message arrays", function(done) {
        var interfaces = {};
        var bus = new MessageBus(interfaces);
        var first = true;

        var message = new Message(Message.Type.Null, 'test', 'Mark');

        var stubbedInterface = {say: function() {
            if (!first) {
                if (bus.queue.length === 0) {
                    done();
                }
                return;
            }

            first = false;
            bus.add([message, message]);
            bus.queue.length.should.equal(2);
        }};

        bus.addInterface(Message.Type.Null, stubbedInterface);
        bus.add(message);
    });
});
