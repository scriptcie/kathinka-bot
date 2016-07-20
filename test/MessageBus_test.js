var Message = require ('../src/Message.js');
var MessageBus = require('../src/MessageBus.js');

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
    });
});
