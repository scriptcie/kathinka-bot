var Help = require ('../../src/Interactions/Help.js');
var Message = require('../../src/Message.js');
var Command = require('../../src/Helpers/Command.js');

describe("The Help interaction", function() {
    var sender = "Mark";

    it("Can print help for a command", function() {
        var message = new Message(Message.Type.Null, "", sender);
        var command = new Command('test', 'test command', message,
                                  function() {});
        var help = new Help();
        var response = help.interact('Kathinka, help test', sender);
        response.should.be.equal('test: test command');
    });

    it("Can print help for all commands", function() {
        var message = new Message(Message.Type.Null, "", sender);
        var command = new Command('test', 'test command', message,
                                  function() {});
        var help = new Help();
        var response = help.interact('Kathinka, help', sender);
        response.should.containDeepOrdered('test: test command');
    });

});
