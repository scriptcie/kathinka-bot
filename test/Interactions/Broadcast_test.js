var Broadcast = require ('../../src/Interactions/Broadcast.js');
var Message = require('../../src/Message.js');
var MessageBus = require ('../../src/MessageBus.js');

describe("The Broadcast interaction", function() {
    var sender = "Mark";

    it("adds channels to the state", function() {
        var bus = new MessageBus({});
        var state = {}

        var broadcast = new Broadcast(state, bus);
        var message = new Message(Message.Type.Null, "Hallo", sender);
        broadcast.interact(message, sender);

        var expected = {channels: {}};
        expected.channels[Message.Type.Null] = [sender];
        state.should.eql(expected);
    });

    it("can have multiple channels on the same network", function() {
        var bus = new MessageBus({});
        var state = {}

        var broadcast = new Broadcast(state, bus);
        var message1 = new Message(Message.Type.Null, "Hallo", 'sender1');
        broadcast.interact(message1, 'sender1');
        var message2 = new Message(Message.Type.Null, "Hallo", 'sender2');
        broadcast.interact(message2, 'sender2');

        var expected = {channels: {}};
        expected.channels[Message.Type.Null] = ['sender1', 'sender2'];
        state.should.eql(expected);
    });

    it("Sends a broadcast message to the bus", function(done) {
        var bus = new MessageBus({});
        var stubbedInterface = {say: function(to, messages) {
            (messages === undefined).should.be.false;
            (messages[0] === undefined).should.be.false;
            messages[0].should.eql("plus fix actiepuntjes");
            to.should.eql(sender);
            done();
        }};
        bus.addInterface(Message.Type.Null, stubbedInterface);

        var broadcast = new Broadcast({}, bus);
        var response = broadcast.interact("Kathinka broadcast plus fix actiepuntjes", sender);
        (response === undefined).should.be.false;
        response.should.equal("Message broadcasted");
    });

    it("Sends a broadcast message to the right channels", function(done) {
        var bus = new MessageBus({});
        var messageTypes = [Message.Type.Null, Message.Type.IRC, Message.Type.Steam];
        var checked = 0;
        messageTypes.forEach(function(messageType) {
            var stubbedInterface = {say: function(to, messages) {
                (messages === undefined).should.be.false;
                (messages[0] === undefined).should.be.false;
                messages[0].should.eql("plus fix actiepuntjes");
                to.should.eql(sender + messageType);
                messageType.should.not.eql(Message.Type.Null);
                checked++;
                checked.should.be.below(3);
                if(checked == 2) {
                    done();
                }
            }};
            bus.addInterface(messageType, stubbedInterface);
        });

        var broadcast = new Broadcast({}, bus);

        // Feed some initial messages
        var message = new Message(Message.Type.IRC, "Hallo", sender + Message.Type.IRC);
        broadcast.interact(message, sender);
        var steamMessage = new Message(Message.Type.Steam, "Hallo", sender + Message.Type.Steam);
        broadcast.interact(steamMessage, sender);

        // Test if it sends back to both of the above channels
        var ircMessage = new Message(Message.Type.IRC, "Kathinka broadcast plus fix actiepuntjes", sender + Message.Type.IRC);
        var response = broadcast.interact(ircMessage, sender);
        (response === undefined).should.be.false;
        response.should.equal("Message broadcasted");
    });

    it("Doesn't broadcast to private messages", function(done) {
        var bus = new MessageBus({});
        var messageTypes = [Message.Type.Null, Message.Type.IRC, Message.Type.Steam];
        var checked = 0;
        messageTypes.forEach(function(messageType) {
            var stubbedInterface = {say: function(to, messages) {
                (messages === undefined).should.be.false;
                (messages[0] === undefined).should.be.false;
                messages[0].should.eql("plus fix actiepuntjes");
                to.should.eql(sender + messageType);
                messageType.should.not.eql(Message.Type.Null);
                checked++;
                checked.should.be.below(2);
                done();
            }};
            bus.addInterface(messageType, stubbedInterface);
        });

        var broadcast = new Broadcast({}, bus);

        // Feed some initial messages
        var message = new Message(Message.Type.IRC, "Hallo", sender);
        message.private = true;
        broadcast.interact(message, sender);
        var ircMessage = new Message(Message.Type.IRC, "Hallo", sender + Message.Type.IRC);
        broadcast.interact(ircMessage, sender);

        // Test if it sends back to both of the above channels
        var privateMessage = new Message(Message.Type.IRC, "Kathinka broadcast plus fix actiepuntjes", sender);
        privateMessage.private = true;
        var response = broadcast.interact(privateMessage, sender);
        (response === undefined).should.be.false;
        response.should.equal("Message broadcasted");
    });

    it("broadcasts to Steam", function(done) {
        var bus = new MessageBus({});
        var messageTypes = [Message.Type.Null, Message.Type.IRC, Message.Type.Steam];
        var checked = 0;
        messageTypes.forEach(function(messageType) {
            var stubbedInterface = {say: function(to, messages) {
                (messages === undefined).should.be.false;
                (messages[0] === undefined).should.be.false;
                messages[0].should.eql("plus fix actiepuntjes");
                to.should.eql(sender + messageType);
                messageType.should.not.eql(Message.Type.Null);
                checked++;
                checked.should.be.below(2);
                done();
            }};
            bus.addInterface(messageType, stubbedInterface);
        });

        var broadcast = new Broadcast({}, bus);

        // Feed some initial messages
        var message = new Message(Message.Type.IRC, "Hallo", sender);
        message.private = true;
        broadcast.interact(message, sender);
        var steamMessage = new Message(Message.Type.Steam, "Hallo", sender + Message.Type.Steam);
        steamMessage.private = true;
        broadcast.interact(steamMessage, sender);

        // Test if it sends back to both of the above channels
        var ircMessage = new Message(Message.Type.IRC, "Kathinka broadcast plus fix actiepuntjes", sender);
        ircMessage.private = true;
        var response = broadcast.interact(ircMessage, sender);
        (response === undefined).should.be.false;
        response.should.equal("Message broadcasted");
    });

    it("removes private channels", function() {
        var bus = new MessageBus({});
        var state = {channels: {}};
        state.channels[Message.Type.IRC] = ['test1', 'test2'];

        var broadcast = new Broadcast(state, bus);

        // Feed some initial messages
        var message1 = new Message(Message.Type.IRC, "Hallo", 'test1');
        message1.private = true;
        broadcast.interact(message1, sender);
        var message2 = new Message(Message.Type.IRC, "Hallo", 'test2');
        broadcast.interact(message2, sender);

        var expected = {channels: {}};
        expected.channels[Message.Type.IRC] = ['test2'];
        state.should.eql(expected);
    });


});
