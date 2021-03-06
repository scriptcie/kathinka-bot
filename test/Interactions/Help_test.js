var Help = require ('../../src/Interactions/Help.js');
var Message = require('../../src/Message.js');
var Command = require('../../src/Helpers/Command.js');

describe("The Help interaction", function() {
    var sender = "Mark";

    beforeEach(function() {
        for (var key in Command.commands) {
            delete Command.commands[key];
        }
    });

    it("can print help for a command", function() {
        var message = new Message(Message.Type.Null, "", sender);
        new Command('test', 'test command', message,
                    function() {});
        var help = new Help();
        var response = help.interact('Kathinka, help test', sender);
        response.should.be.equal('test: test command');
    });

    it("can print help for all commands", function() {
        var message = new Message(Message.Type.Null, "", sender);
        new Command('test', 'test command', message,
                    function() {});
        new Command('test2', 'test2 command', message,
                    function() {});
        var help = new Help();
        var response = help.interact('Kathinka, help', sender);
        // Filter help help
        response = response.replace(/^(.*)help(.*)\n/img, '');
        response.should.be.equal('test: test command\ntest2: test2 command\n');
    });

    it("can print man for a command", function() {
        var message = new Message(Message.Type.Null, "", sender);
        new Command('test', 'test command', message,
                    function() {});
        var help = new Help();
        var response = help.interact('Kathinka, man test', sender);
        response.should.be.equal('test: test command');
    });

    it("can print help for a command with multiple possible names", function() {
        var message = new Message(Message.Type.Null, "", sender);
        new Command(['test2', 'test3'], 'test command', message,
                    function() {});
        var help = new Help();
        var response = help.interact('Kathinka, help test2', sender);
        response.should.be.equal('[test2, test3]: test command');
        response = help.interact('Kathinka, help test3', sender);
        response.should.be.equal('[test2, test3]: test command');
    });

    it("gives some help when you ask help for a non-existing command", function() {
        var message = new Message(Message.Type.Null, "", sender);
        new Command('test', 'test command', message,
                    function() {});
        var help = new Help();
        var response = help.interact('Kathinka, help notacommand', sender);
        response.should.be.equal('notacommand not found. Use help without arguments to find all possible commands');
    });

    it("can print help for a command using one possible regex", function() {
        var message = new Message(Message.Type.Null, "", sender);
        new Command(/test([0-9])/, 'test command', message,
                    function() {});
        var help = new Help();
        var response = help.interact('Kathinka, help test1', sender);
        response.should.be.equal('/test([0-9])/: test command');
    });

    it("can handle subcommands", function() {
        var message = new Message(Message.Type.Null, "", sender);
        var command = new Command('test', 'test command', message,
                                  function() {});
        command.add(new Command('test2', 'test subcommand', message,
                                function() {}));
        var help = new Help();
        var response = help.interact('Kathinka, help test', sender);
        response.should.be.equal('test: test command\n    test2: test subcommand');
    });

    it("can handle subcommands in help all", function() {
        var message = new Message(Message.Type.Null, "", sender);
        var command = new Command('test', 'test command', message,
                    function() {});
        command.add(new Command('test2', 'test subcommand', message,
                                              function() {}));
        var help = new Help();
        var response = help.interact('Kathinka, help', sender);
        // Filter help help
        response = response.replace(/^(.*)help(.*)\n/img, '');
        response.should.be.equal('test: test command\n    test2: test subcommand\n');
    });

    it("can handle command lists", function() {
        var message = new Message(Message.Type.Null, "", sender);
        var commandList = new Command.List('test', 'test commands');
        commandList.add(new Command('test1', 'test1 command', message,
                                    function() {}));
        commandList.add(new Command('test2', 'test2 command', message,
                                    function() {}));
        var help = new Help();
        var response = help.interact('Kathinka, help test', sender);
        response.should.be.equal('test: test commands\n    test1: test1 command\n    test2: test2 command');
    });

});
