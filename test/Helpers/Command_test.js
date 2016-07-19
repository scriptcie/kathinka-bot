var Message = require ('../../src/Message.js');
var Command = require ('../../src/Helpers/Command.js');

describe("Command", function() {
    var prefixes = [
        "Kathinka-bot",
        "kathinka-bot",
        "Kathinka",
        "kathinka",

        "Kathinka-bot, ",
        "kathinka-bot, ",
        "Kathinka, ",
        "kathinka, ",

        "Kathinka-bot: ",
        "kathinka-bot: ",
        "Kathinka: ",
        "kathinka: ",
    ];

    it("can handle Message objects", function() {
        prefixes.forEach(function(prefix) {
            var message = new Message(Message.Type.Null,
                                      prefix + " work",
                                      "Mark");
            var command = new Command(/work$/, '', message, function() {
                return "works";
            });
            var response = command.handle();
            (response === undefined).should.be.false;
            response.should.equal("works");
        });
    });

    it("can handle strings as message", function() {
        prefixes.forEach(function(prefix) {
            var message = "work";
            var command = new Command(/work$/, '', message, function() {
                return "works";
            });
            var response = command.handle();
            (response === undefined).should.be.false;
            response.should.equal("works");
        });
    });

    it("can handle strings as regex", function() {
        prefixes.forEach(function(prefix) {
            var message = "work";
            var command = new Command("work", '', message, function() {
                return "works";
            });
            var response = command.handle();
            (response === undefined).should.be.false;
            response.should.equal("works");
        });
    });

    it("can handle regex flags", function() {
        prefixes.forEach(function(prefix) {
            var message = "work";
            var command = new Command(/WORK/i, '', message, function() {
                return "works";
            });
            var response = command.handle();
            (response === undefined).should.be.false;
            response.should.equal("works");
        });
    });

    it("can handle subcommands", function() {
        prefixes.forEach(function(prefix) {
            var message = "work now";
            var command = new Command(/work/, '', message, function() {
                return "doesn't work";
            });
            command.add(new Command(/now/, '', message, function() {
                return "works";
            }));
            var response = command.handle();
            (response === undefined).should.be.false;
            response.should.equal("works");
        });
    });

    it("can handle subcommands with extra matching groups", function() {
        prefixes.forEach(function(prefix) {
            var message = "work now";
            var command = new Command(/(work)/, '', message, function() {
                return "doesn't work";
            });
            command.add(new Command(/now/, '', message, function() {
                return "works";
            }));
            var response = command.handle();
            (response === undefined).should.be.false;
            response.should.equal("works");
        });
    });
});

describe("CommandList", function() {
    var prefix = "Kathinka-bot";

    it("can handle multiple Commands", function() {
        var message = new Message(Message.Type.Null,
                                  prefix + " work",
                                  "Mark");
        var commandList = new Command.List();
        commandList.add(new Command(/work$/, '', message, function() {
            return "works";
        }));
        commandList.add(new Command(/chill$/, '', message, function() {
            return "doesn't work";
        }));
        var response = commandList.handle();
        (response === undefined).should.be.false;
        response.should.equal("works");
    });
});
