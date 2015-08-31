var Message = require ('../src/Message.js');

describe("Message", function() {
    it("can recognize questions", function() {
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

        prefixes.forEach(function(prefix) {
            var message = new Message(Message.Type.Null,
                                      prefix + " kan ik jou dit vragen?",
                                      "Mark");
            var question = message.question();
            question.should.equal("kan ik jou dit vragen");
        });
    });

    it("returns null when something isn't a question", function() {
        var message = new Message(Message.Type.Null, "Hallo!", "Mark");
        var question = message.question();
        (question === false).should.be.true;
    });

    it("car recognize commands", function() {
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

        prefixes.forEach(function(prefix) {
            var message = new Message(Message.Type.Null,
                                      prefix + " doe dit",
                                      "Mark");
            var command = message.command();
            command.should.equal("doe dit");
        });
    });

    it("returns null when something isn't a command", function() {
        var message = new Message(Message.Type.Null, "Hallo!", "Mark");
        var command = message.command();
        (command === null).should.be.true;
    });
});
