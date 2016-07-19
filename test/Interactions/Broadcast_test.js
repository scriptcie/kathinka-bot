var Broadcast = require ('../../src/Interactions/Broadcast.js');
var Message = require('../../src/Message.js');
var MessageBus = require ('../../src/MessageBus.js');

describe("The Broadcast interaction", function() {
    var sender = "Mark";

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
        var message = new Message(Message.Type.Steam, "Hallo", sender + Message.Type.Steam);
        broadcast.interact(message, sender);

        // Test if it sends back to both of the above channels
        var message = new Message(Message.Type.IRC, "Kathinka broadcast plus fix actiepuntjes", sender + Message.Type.IRC);
        var response = broadcast.interact(message, sender);
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
        var message = new Message(Message.Type.IRC, "Hallo", sender + Message.Type.IRC);
        broadcast.interact(message, sender);

        // Test if it sends back to both of the above channels
        var message = new Message(Message.Type.IRC, "Kathinka broadcast plus fix actiepuntjes", sender);
        message.private = true;
        var response = broadcast.interact(message, sender);
        (response === undefined).should.be.false;
        response.should.equal("Message broadcasted");
    });

    it("Does broadcast to Steam", function(done) {
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
        var message = new Message(Message.Type.Steam, "Hallo", sender + Message.Type.Steam);
        message.private = true;
        broadcast.interact(message, sender);

        // Test if it sends back to both of the above channels
        var message = new Message(Message.Type.IRC, "Kathinka broadcast plus fix actiepuntjes", sender);
        message.private = true;
        var response = broadcast.interact(message, sender);
        (response === undefined).should.be.false;
        response.should.equal("Message broadcasted");
    });

});
